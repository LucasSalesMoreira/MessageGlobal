module.exports = class ManagerBD {

    constructor() {
        this.ConnectionDB = require('./ConnectionDB');
    }

    async login(data) {
        const connectionDB = new this.ConnectionDB();
        const sql = `select * from User where email = '${data.email}' and password = '${data.password}'`;
        
        try {
            var results = await connectionDB.searsh(sql);
            console.log(`Resultado do login -> ${JSON.stringify(results)}`);
            
            if (results[0]) {
                if (results[0].email === data.email && results[0].password === data.password)
                    return { ok: true, name: results[0].name };
                else
                    return { ok: false };
            } else {
                return { ok: false };
            }
        
        } catch (error) {
            console.log(`Falha no login: ${error}`);
            return { ok: false };
        }
    }

    async loadContacts(email) {
        const connectionDB = new this.ConnectionDB();
        const sql = `select c.email_contact, u.name from contacts c join User u on u.email = c.email_contact where c.email_user = '${email}'`;
        
        try {
            var results = await connectionDB.searsh(sql);
            console.log(`Contatos -> ${JSON.stringify(results)}`);
            return results;
        } catch (error) {
            console.log(`Falha ao carregar os contatos: ${error}`);
            return null;
        }
    }

    async sendNewAuthentication(data) {
        var name = data.name;
        var email = data.email;
        
        const generate = require('./email/codeGenerator.js');
        const code = generate();
        
        const sql = `insert into authentication (code, email, name) values ('${code}', '${email}', '${name}')`;
        const connectionDB = new this.ConnectionDB(); 
        
        try {
            await connectionDB.execute(sql);
            const sendEmail = require('./email/sendEmail.js');
            sendEmail(email, code);
            return { ok: true };
        } catch (error) {
            console.log(`Falha ao gerar nova autenticação -> ${error}`);
            return { ok: false };
        }
    }

    async authenticate(data) {
        const connectionDB = new this.ConnectionDB();
        
        try {
            const sql_authentication = `select * from authentication where code = ${data.code}`;
            var results = await connectionDB.searsh(sql_authentication);
            
            if (results) {
                const sql_new_user = `insert into User (name, email, password) values ('${results.name}', '${results.email}', '${data.password}')`;
                const sql_delete_code = `delete from authentication where code = '${results.code}'`;
                console.log(data.email + ' --- ' + results.email);
                
                if (data.email === results.email) {
                    await connectionDB.execute(sql_new_user);
                    await connectionDB.execute(sql_delete_code);
                    const path = require('path');
                    const Manager = require(path.resolve('src/fileManager/Manager.js'));
                    await new Manager().createMessageFile(results.email);
                    return { ok: true };
                } else {
                    return { ok: false };
                }
            
            } else {
                return { ok: false };
            }
        
        } catch (error) {
            console.log(`Falha na autenticação -> ${error}`);
            return { ok: false };
        }
    }
}