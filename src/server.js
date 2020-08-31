const express = require('express');
const app = express();

const axios = require('axios');

//---------- CRIA AS ROTAS MIKAIO.
app.use(express.static(__dirname + '/public'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected!`);

    socket.on('test1', (parameter) => {
        console.log(parameter);
    });

    socket.on('login', (userData) => {
        var name = userData.name;
        var password = userData.password;

        console.log(`Dados de acesso -> nome: ${name} senha: ${password}`);
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
        const sql = `insert into authentication (code, email, name, number) values (${code}, '${email}', '${name}', '${number}')`;
        connection.create(sql);

        const sendEmail = require('./email/sendEmail.js');
        sendEmail(email, code);
    });

    socket.on('authenticating', (authentication) => {
        var code = authentication.code;
        var email = authentication.email;
        var name = authentication.name;
        var number = authentication.number;
        //Fazer busca no banco pelo code.
        const connection = require('./sql_connection/connection.js');
        var sql = `select * from authentication where code = ${code}`;
        var object = connection.searsh(sql);
        console.log(object.code);
        //se bater com o email -> cadastrar user
        //se n -> retornar erro de autenticação
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected!`);
    });

});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));
//http.listen(process.env.PORT || 3000, '192.168.1.66', () => console.log('Servidor rodando!!!'));