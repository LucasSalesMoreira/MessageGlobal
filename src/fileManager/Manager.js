//module.exports = 
class Manager {
    
    constructor() {
        this.file = require('fs');
    }

    createMessageFile(fileName) {
        const messageObject = {
            name: '',
            inbox: [{contact: '', text: '', date: ''}],
            sendbox: [{contact: '', text: '', date: ''}]
        };
        var url = `./src/cache/messages/${fileName}`;
        this.file.writeFile(url, JSON.stringify(messageObject), 'utf8', (error) => {
            error ? console.log(`Falha: ${error}`) : console.log('Arquivo de mensagens criado com sucesso!');
        });
    }

    readMessageFile() {

    }

    addMessage() {

    }
}

const m = new Manager();
m.createMessageFile('user_test2.json');