const express = require('express');
const app = express();
const path = require('path');
//const Manager = require(path.resolve('src/fileManager/Manager.js'));
const Manager = require('./fileManager/Manager.js');

app.use(express.static(__dirname + '/public'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const statusUsers = { emails: [], sockets: [] };

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected!`);
    socket.emit('welcome', {connected: true});

    socket.on('loadMessages', async (emailObject) => {
        /*
        const data = await new Manager().loadMessages(email);
        socket.emit('loadMessages', data);
        */
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const data = await new ManagerDB().loadMessages(emailObject);
        socket.emit('loadMessages', data);
    });

    socket.on('loadContacts', async (email) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const contacts = await new ManagerDB().loadContacts(email);
        statusUsers.emails.push(email);
        statusUsers.sockets.push(socket);
        socket.emit('loadContacts', contacts);
        for (i = 0; i < statusUsers.emails.length; i++)
            console.log('ONLINE ---> '+statusUsers.emails[i]);
    });

    socket.on('search_email', async (data) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const r = await new ManagerDB().searchEmails(data);
        socket.emit('loadMessages', r);
    });

    socket.on('msg', async (msgObject) => {
        console.log(`New message: ${msgObject}`);
        
        for (i = 0; i < statusUsers.emails.length; i++)
            console.log('ONLINE ---> '+statusUsers.emails[i]);

        var emailContact = msgObject.emailContact;
        var index = statusUsers.emails.indexOf(emailContact);
        
        if (index >= 0) {
            var contactSocket = statusUsers.sockets[index];
            console.log(`Socket do contato: ${contactSocket.id}`);
            contactSocket.emit('NEW_MSG_IN_HOME', {msg: msgObject.text});
            contactSocket.emit('NEW_MSG_IN_CHAT', {msg: msgObject.text});
        } else {
            console.log(`User ${emailContact} encontra-se offline`);
        }
        
        /*const manager = new Manager();
        await manager.addMessage(msgObject);*/
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        await new ManagerDB().addMessage(msgObject);
    });

    socket.on('login', async (userData) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const r = await new ManagerDB().login(userData);
        socket.emit('login', r);
    });

    socket.on('token_validation', async (data) => {
        // Validar token no banco
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const r = await new ManagerDB().loginByToken(data.token);
        socket.emit('token_validation', r);
    });

    socket.on('new_authentication', async (userData) => {
        //Enviar email de confirmação.
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const r = await new ManagerDB().sendNewAuthentication(userData);
        socket.emit('new_authentication', r); 
    });

    socket.on('authenticating', async (authentication) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const r = await new ManagerDB().authenticate(authentication);
        console.log(r);
        socket.emit('authenticating', r);
    });

    socket.on('disconnect', () => {
        var index = statusUsers.sockets.indexOf(socket);
        const numOfElementsForRemove = 1;
        if (index >= 0) {
            statusUsers.sockets.splice(index, numOfElementsForRemove);
            statusUsers.emails.splice(index, numOfElementsForRemove);
            console.log(`Index de usuário removido ---> ${index}`);
        }
        console.log(`User ${socket.id} disconnected!`);
    });

});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));