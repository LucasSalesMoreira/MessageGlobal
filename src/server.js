const express = require('express');
const app = express();

const axios = require('axios');
const path = require('path');

//---------- CRIA AS ROTAS MIKAIO.

app.use(express.static(__dirname + '/public'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected!`);
    socket.emit('welcome', {connected: true});

    socket.on('loadMessages', (email) => {
        //const Manager = require(path.resolve('src/fileManager/Manager.js'));
        const Manager = require('./fileManager/Manager.js');
        new Manager().loadMessages(email, socket);
    });

    socket.on('msg', (msgObject) => {
        const Manager = require(path.resolve('src/fileManager/Manager.js'));
        const manager = new Manager();
        manager.addMessage(msgObject);

        //Continuar codigo de envio de mensagens...
    });

    socket.on('login', (userData) => {
        const connection = require('./sql_connection/connection.js');
        connection.login(userData, socket);
    });

    socket.on('new_authentication', (userData) => {
        var name = userData.name;
        var password = userData.password;
        var email = userData.email;
        var number = userData.number;

        //Enviar email de confirmação.

        const generate = require('./email/codeGenerator.js');
        var code = generate();

        const connection = require('./sql_connection/connection.js');
        const sql = `insert into authentication (code, email, name) values (${code}, '${email}', '${name}')`;
        connection.create(sql);

        const sendEmail = require('./email/sendEmail.js');
        sendEmail(email, code);
    });

    socket.on('authenticating', (authentication) => {
        const connection = require('./sql_connection/connection.js');
        connection.authenticate(authentication, socket);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected!`);
    });

});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));
//http.listen(process.env.PORT || 3000, '192.168.1.66', () => console.log('Servidor rodando!!!'));