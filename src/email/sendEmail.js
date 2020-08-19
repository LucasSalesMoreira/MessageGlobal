module.exports = (email) => {
    const nodemailer = require('nodemailer');

    const myEmail = 'lucasdevsoftware@gmail.com';
    
    console.log(process.env.EMAIL_PASS);
    
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: myEmail,
            pass: process.env.EMAIL_PASS,
        }
    });

    var body = {
        from: myEmail,
        to: email,
        subject: '<h1>Validação de email: 967921</h1>',
        text: '<h3>Seja bem vindo ao nosso app!</h3>'
    };

    transport.sendMail(body, (error, info) => {
        if (error)
            console.log(`Falha no envio do email! -> ${error.message}`);
        else
            console.log(`Email enviado com sucesso! -> ${info.response}`);
    });
};