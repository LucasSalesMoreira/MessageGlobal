module.exports = class ManagerBD {

    constructor() {
        this.ConnectionDB = require('./ConnectionDB');
        this.path = require('path');
        this.uuid = require('uuid');
        this.crypto = require('crypto');
    }

    async login(data) {
        const connectionDB = new this.ConnectionDB();
        const encryptedPassword = this.crypto.createHash('sha256').update(data.password).digest('hex');
        console.log(encryptedPassword);
        const sqlLogin = `select * from user where email = '${data.email}' and password = '${encryptedPassword}'`;
        try {
            const results = await connectionDB.search(sqlLogin);
            console.log(`Resultado do login -> ${JSON.stringify(results)}`);

            if (results[0] != null) {
                const token = this.uuid.v4();
                console.log(`New token: ${token}`);
                const encryptedTokenHash = this.crypto.createHash('sha256').update(token).digest('hex');
                console.log(`Token criptografado: ${encryptedTokenHash}`);
                const sqlCountToken = `select count(token) as num_token from session where email = '${results[0].email}'`;
                const resultsTokens = await connectionDB.search(sqlCountToken);
                if (resultsTokens[0].num_token == 0) {
                    const sqlInsertToken = `insert into session (token, email) values ('${encryptedTokenHash}', '${results[0].email}')`;
                    await connectionDB.execute(sqlInsertToken);
                    console.log('(insert executado)');
                } else {
                    const sqlUpdateToken = `update session set token = '${encryptedTokenHash}' where email = '${results[0].email}'`;
                    await connectionDB.execute(sqlUpdateToken);
                    console.log('(update executado)');
                }
                return { ok: true, name: results[0].name, newToken: token };
            } else {
                return { ok: false };
            }

        } catch (error) {
            console.log(`Falha no login: ${error}`);
            return { ok: false };
        }
    }

    async loginByToken(token) {
        const connectionDB = new this.ConnectionDB();
        const encryptedTokenHash = this.crypto.createHash('sha256').update(token).digest('hex');
        console.log(`Token criptografado: ${encryptedTokenHash}`);
        const sql = `select u.email, u.name from user u join session s on u.email = s.email where s.token = '${encryptedTokenHash}'`;

        try {
            const results = await connectionDB.search(sql);
            console.log(results[0].name + " --- " + results[0].email);
            return { ok: true, email: results[0].email, name: results[0].name };
        } catch (error) {
            return { ok: false };
        }
    }

    async loadContacts(email) {
        const connectionDB = new this.ConnectionDB();
        const sql = `select c.email_contact, u.name from contacts c join user u on u.email = c.email_contact where c.email_user = '${email}'`;

        try {
            var results = await connectionDB.search(sql);
            console.log(`Contatos -> ${JSON.stringify(results)}`);
            return results;
        } catch (error) {
            console.log(`Falha ao carregar os contatos: ${error}`);
            return null;
        }
    }

    async loadMessages(emailObject) {
        const userEmail = emailObject.userEmail;
        const contactEmail = emailObject.contactEmail;
        const sql = `select id, sender_email, inputer_email, text, DATE_FORMAT(date, '%d-%m-%Y %h-%i %p') as date from messages 
        where inputer_email = '${userEmail}' 
        and sender_email = '${contactEmail}' 
        or inputer_email = '${contactEmail}'
        and sender_email = '${userEmail}'`;

        const connectionDB = new this.ConnectionDB();
        
        try {
            const results = await connectionDB.search(sql);
            console.log(`Mensagens carregadas -> ${JSON.stringify(results)}`);
            return results;
        } catch (error) {
            console.log(`Falha ao carregar as mensagens: ${error}`);
            return null;
        }
    }

    async searchEmails(data) {
        const connectionDB = new this.ConnectionDB();
        const sql = `select email, name from user where email != '${data.emailUser}' and email like '${data.byte}%'`;
        try {
            const results = await connectionDB.search(sql);
            console.log(`Emails encontrados -> ${JSON.stringify(results)}`);
            return results;
        } catch (error) {
            console.log(`Falha ao buscar emails: ${error}`);
            return null;
        }
    }

    async addContact(data) {
        const connectionDB = new this.ConnectionDB();
        
        const emailUser = data.emailUser;
        const emailContact = data.emailContact;

        const sql_verify = `select * from contacts where 
        email_user = '${emailUser}' 
        and email_contact = '${emailContact}' 
        or email_user = '${emailContact}' 
        and email_contact = '${emailUser}'`;
        const sql = `insert into contacts (email_user, email_contact) values 
        ('${emailUser}', '${emailContact}'), 
        ('${emailContact}', '${emailUser}')`;
        
        try {
            const result = await connectionDB.search(sql_verify);
            if (!result[0]) {
                await connectionDB.execute(sql);
                return { ok: true };
            } else {
                return { ok: false };
            }
        } catch (error) {
            console.log(`Falha ao adicionar novo contato: ${error}`);
            return { ok: false };
        }
    }

    async addMessage(msgObject) {
        const senderEmail = msgObject.emailUser;
        const inputerEmail = msgObject.emailContact;
        const text = msgObject.text;
        const sql = `insert into messages (sender_email, inputer_email, text, date) 
            values ('${senderEmail}', '${inputerEmail}', '${text}', current_time())`;
        const connectionDB = new this.ConnectionDB();
        try {
            await connectionDB.execute(sql);
            return { ok: true };
        } catch (error) {
            console.log(`Falha ao salvar as mensagens: ${error}`);
            return { ok: false };
        }
    }

    async sendNewAuthentication(data) {
        var name = data.name;
        var email = data.email;
        //D:\DEVELOPER\projects\MessageGlobal\src\email\codeGenerator.js
        const generate = require(this.path.resolve('./src/email/codeGenerator.js'));
        const code = generate(); //APENAS APOIS O DEPLOY NO SERVIDOR!

        const sql = `insert into authentication (code, email, name) values ('${code}', '${email}', '${name}')`;
        const sql_verify = `select email from user where email = '${email}'`;
        const connectionDB = new this.ConnectionDB();

        try {
            const result = await connectionDB.search(sql_verify);
            if (!result[0]) {
                await connectionDB.execute(sql);
                const sendEmail = require(this.path.resolve('./src/email/sendEmail.js'));
                sendEmail(email, code);
                return { ok: true };
            } else {
                console.log('Email já cadastrado!');
                return { ok: false };
            }
        } catch (error) {
            console.log(`Falha ao gerar nova autenticação -> ${error}`);
            return { ok: false };
        }
    }

    async authenticate(data) {
        const connectionDB = new this.ConnectionDB();

        try {
            const sql_authentication = `select * from authentication where code = '${data.code}'`;
            const r = await connectionDB.search(sql_authentication);
            const results = r[0];
            if (results) {
                const encryptedPassword = this.crypto.createHash('sha256').update(data.password).digest('hex');
                const sql_new_user = `insert into user (name, email, password) values ('${results.name}', '${results.email}', '${encryptedPassword}')`;
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