module.exports = class Manager {
    
    constructor() {
        this.file = require('fs');
        this.data = null;
    }

    createMessageFile(fileName) {
        const messageObject = {
            name: fileName,
            inbox: [{}],
            sendbox: [{}]
        };
        var url = `./src/cache/messages/${fileName}.json`;
        this.file.writeFile(url, JSON.stringify(messageObject), 'utf8', (error) => {
            error ? console.log(`Falha: ${error}`) : console.log('Arquivo de mensagens criado com sucesso!');
        });
    }

    readMessageFile(fileName) {
        var url = `./src/cache/messages/${fileName}.json`;

        this.file.readFile(url, 'utf8', (error, data) => {
            error ? console.log(`Falha: ${error}`) : this.data = data;
        });
    }

    addMessage(msgObject) {
        this.readMessageFile(msgObject.name);
        
        setTimeout(() => {
            console.log(this.data);

            var dataObject = JSON.parse(this.data);

            var contact = msgObject.contact;
            var text = msgObject.text;
            var date = msgObject.date;
            
            if (msgObject.type === 'in') {
                dataObject.inbox.push({contact: contact, text: text, date: date});
            }
            else if (msgObject.type === 'out') {
                dataObject.sendbox.push({contact: contact, text: text, date: date});
            }

            var url = `./src/cache/messages/${msgObject.name}.json`;
            this.file.writeFile(url, JSON.stringify(dataObject), 'utf8', (error) => {
                error ? console.log(`Falha: ${error}`) : console.log('Nava mensagem salva no cache!');
            });

            this.data = null;
        }, 100);
    }
}
/*
const m = new Manager();
//m.createMessageFile('user_test2');
//m.readMessageFile('user_test2');
m.addMessage({name: 'user_test2', type: 'out', contact: 'Eduardo', text: 'blablablablabla', date: '08/09/2020 - 16:11'});
*/