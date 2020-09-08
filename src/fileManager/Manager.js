//module.exports = 
class Manager {
    
    constructor() {
        this.file = require('fs');
        this.data = null;
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

    readMessageFile(fileName) {
        var url = `./src/cache/messages/${fileName}`;

        this.file.readFile(url, 'utf8', (error, data) => {
            error ? console.log(`Falha ${error}`) : this.data = data;
        });
    }

    addMessage(msgObject) {
        this.readMessageFile(`${msgObject.name}.json`);
        setTimeout(() => {
            console.log(this.data);

            var dataObject = JSON.parse(this.data);
            console.log(dataObject.name);

            this.data = null;
        }, 100);
    }
}

const m = new Manager();
//m.createMessageFile('user_test2.json');
//m.readMessageFile('user_test2.json');
m.addMessage({name: 'user_test'});