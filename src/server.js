const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/teste', (request, response) => response.sendFile('index.html'));

io.on('connection', (socket) => {
    console.log(socket.id);
});

http.listen(process.env.PORT || 3000, () => console.log('Servidor rodando!!!'));