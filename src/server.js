const express = require('express');
const app = express();
const path = require('path');
//const Manager = require(path.resolve('src/fileManager/Manager.js'));
const Manager = require('./fileManager/Manager.js');

app.use(express.static(__dirname + '/public'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected!`);
    socket.emit('welcome', {connected: true});

    socket.on('loadMessages', async (email) => {
        const data = await new Manager().loadMessages(email);
        socket.emit('loadMessages', data);
    });

    socket.on('loadContacts', async (email) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const contacts = await new ManagerDB().loadContacts(email);
        socket.emit('loadContacts', contacts);
    });

    socket.on('msg', async (msgObject) => {
        console.log(`New message: ${msgObject}`);
        const manager = new Manager();
        await manager.addMessage(msgObject);

        //Continuar codigo de envio de mensagens...
    });

    socket.on('login', async (userData) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        const r = await new ManagerDB().login(userData);
        socket.emit('login', r);
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
        socket.emit('_authenticating', r);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected!`);
    });

});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));