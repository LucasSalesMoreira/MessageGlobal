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
        var data = await new Manager().loadMessages(email);
        socket.emit('loadMessages', data);
    });

    socket.on('loadContacts', async (email) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        var contacts = await new ManagerDB().loadContacts(email);
        socket.emit('loadContacts', contacts);
    });

    socket.on('msg', async (msgObject) => {
        console.log(`New message: ${msgObject}`);
        const manager = new Manager();
        await manager.addMessage(msgObject);

        //Continuar codigo de envio de mensagens...
    });

    socket.on('login', async (userData) => {
        /*const connection = require('./sql_connection/connection.js');
        connection.login(userData, socket);*/
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        var r = await new ManagerDB().login(userData);
        socket.emit('login', r);
    });

    socket.on('new_authentication', (userData) => {
        var name = userData.name;
        var password = userData.password;
        var email = userData.email;
        var number = userData.number;

        //Enviar email de confirmação.

        const generate = require('./email/codeGenerator.js');
        var code = generate();

        const connection = require('./sql_connection/ManagerDB.js');
        const sql = `insert into authentication (code, email, name) values (${code}, '${email}', '${name}')`;
        connection.create(sql);

        const sendEmail = require('./email/sendEmail.js');
        sendEmail(email, code);
    });

    socket.on('authenticating', async (authentication) => {
        const ManagerDB = require('./sql_connection/ManagerDB.js');
        var r = await new ManagerDB().authenticate(authentication);
        socket.emit('_authenticating', r);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected!`);
    });

});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));
//http.listen(process.env.PORT || 3000, '192.168.1.66', () => console.log('Servidor rodando!!!'));