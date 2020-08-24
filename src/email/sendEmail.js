//module.exports = 
const f = (email) => {
    const nodemailer = require('nodemailer');

    const myEmail = 'messageglobal@bol.com.br';
    
    const transport = nodemailer.createTransport({
        host: 'smtps.bol.com.br',
        port: 587,
        auth: {
            user: myEmail,
            pass: 'mecatronico15*',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var body = {
        from: myEmail,
        to: [email],
        subject: 'Validação de email: 967921',
        html: '<h3>Seja bem vindo ao nosso app!</h3>'
    };

    transport.sendMail(body, (error, info) => {
        if (error)
            console.log(`Falha no envio do email! -> ${error.message}`);
        else
            console.log(`Email enviado com sucesso! -> ${info.response}`);
    });
};

f('lucassalesmoreira161@gmail.com');