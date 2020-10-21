module.exports = () => {
    var code = '';
    for (i = 0; i < 5; i++) {
        code += Math.floor(Math.random() * 10);
    }
    console.log(`Codigo de validação de email: ${code}`);
    return code;
};