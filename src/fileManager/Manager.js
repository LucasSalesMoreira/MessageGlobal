module.exports = class Manager {

    constructor() {
        this.promisify = require('util').promisify;
        this.readFile = this.promisify(require('fs').readFile);
        this.writeFile = this.promisify(require('fs').writeFile);
    }

    async createMessageFile(fileName) {
        const messageObject = {
            email: fileName,
            inbox: [{}],
            sendbox: [{}]
        };
        //var url = `./MessageGlobal/src/cache/messages/${fileName}.json`;
        var url = `./src/cache/messages/${fileName}.json`;
        try {
            await this.writeFile(url, JSON.stringify(messageObject), 'utf8');
            console.log('Arquivo criado!');
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async readMessageFile(fileName) {
        //var url = `./MessageGlobal/src/cache/messages/${fileName}.json`;
        var url = `./src/cache/messages/${fileName}.json`;
        try {
            return await this.readFile(url, 'utf8');
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async addMessage(msgObject) {
        var data = await this.readMessageFile(msgObject.email);
        console.log(data);

        var dataObject = JSON.parse(data);

        var emailContact = msgObject.emailContact
        var contact = msgObject.contact;
        var text = msgObject.text;
        var date = msgObject.date;

        if (msgObject.type === 'in') {
            dataObject.inbox.push({ emailContact: emailContact, contact: contact, text: text, date: date });
        }
        else if (msgObject.type === 'out') {
            dataObject.sendbox.push({ emailContact: emailContact, contact: contact, text: text, date: date });
        }

        //var url = `./MessageGlobal/src/cache/messages/${msgObject.email}.json`;
        var url = `./src/cache/messages/${msgObject.email}.json`;
        try {
            await this.writeFile(url, JSON.stringify(dataObject), 'utf8');
            console.log('Nova mensagem salva com sucesso!');
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async loadMessages(email, socket) {
        var data = await this.readMessageFile(email);
        console.log(JSON.parse(data));
        socket.emit('loadMessages', this.data);
    }

    async test() {
        await this.createMessageFile('meu_pau@gmail.com');
        await this.addMessage({email: 'meu_pau@gmail.com', type: 'in', emailContact: 'josiana@gmail.com', contact: 'Josiana', text: 'meu pau de avental fazendo bacanal', date: '08/09/2020 - 16:11'});
        console.log('Fim da execução!');
    }

}

//const m = new Manager();
//m.test();
//m.createMessageFile('user_test3@gmail.com');
//m.readMessageFile('user_test2');
//m.addMessage({email: 'user_test3@gmail.com', type: 'in', emailContact: 'josiana@gmail.com', contact: 'Josiana', text: 'meu pau de avental fazendo bacanal', date: '08/09/2020 - 16:11'});
//console.log('fim do programa');
