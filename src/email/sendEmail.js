module.exports = (email, code) => {
    const nodemailer = require('nodemailer');

    const myEmail = 'darksheet@messageglobalapp.com';
    const password = process.env.pass_email;

    const transport = nodemailer.createTransport({
        host: 'smtp.umbler.com',
        port: 587,
        auth: {
            user: myEmail,
            pass: password,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var body = {
        from: myEmail,
        to: [email],
        subject: `Código para validação de email: ${code}`,
        html: '<h3>Seja bem vindo ao nosso app!</h3>'
    };

    transport.sendMail(body, (error, info) => {
        if (error)
            console.log(`Falha no envio do email! -> ${error.message}`);
        else
            console.log(`Email enviado com sucesso! -> ${info.response}`);
    });
};