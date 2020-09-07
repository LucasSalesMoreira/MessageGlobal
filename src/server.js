const express = require('express');
const app = express();

const axios = require('axios');

//---------- CRIA AS ROTAS MIKAIO.

app.use(express.static(__dirname + '/public'));
app.get('/alycia_lima', (rec, res) => res.sendFile(__dirname + '/public/curriulumvitae.html'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected!`);

    socket.on('test1', (parameter) => {
        console.log(parameter);
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
        /*
        var code = authentication.code;
        var email = authentication.email;
        var name = authentication.name;
        var number = authentication.number;
        //Fazer busca no banco pelo code.
        
        var sql = `select * from authentication where code = ${code}`;*/
        const connection = require('./sql_connection/connection.js');
        connection.authenticate(authentication, socket);

        //se bater com o email -> cadastrar user
        //se n -> retornar erro de autenticação
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected!`);
    });

});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));
//http.listen(process.env.PORT || 3000, '192.168.1.66', () => console.log('Servidor rodando!!!'));