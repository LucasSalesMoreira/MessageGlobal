const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/teste', (request, response) => response.sendFile('index.html'));

//---------- CRIA AS ROTAS MIKAIO.

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('test1', (parameter) => {
        console.log(parameter);
    });

});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));