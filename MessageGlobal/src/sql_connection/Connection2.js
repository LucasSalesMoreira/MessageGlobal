//Author: Filipe Santos.
module.exports = class Connection {

    constructor() {
        this.database = require('knex')({
            client: 'mysql',
            connection: {
            host: process.env.host_db,
            user: process.env.user_db,
            password: process.env.pass_db,
            database: process.env.db
            }
        });
    }

    //inserindo dados no banco usando knex
    create(data) {
        database.insert({name: data.name, email: data.email, password: data.password}).into("User").then(
            console.log('>>>> Cadastro realizado!')
        ).catch(err => {
            console.log(`Erro: ${err}`)
        });
    }

    //Buscando dados no banco usando knex
    search(data) {
        database.where({name: data.nome}).table("user").then(results => {
            console.log('>>>> Busca realizada!');
        }).catch(err => {
            console.log(`Erro: ${err}`);
        });
    }

    //altentificando email
    authentication(data, socket) {
        database.where({code: data.code}).table("authentication").timeout(() => {

        }, 1500);
    }

    //alterando dados no banco usando knex
    update(data) {
        database.where({data}).update({valorAtual: novoValor}).table('').then(
            console.log('>>>> Atualização realizada!')
        ).catch(err => {
            console.log(`Erro: ${err}.`);
        });
    }

    //deletando dados no banco usando knex
    delete(table, data) {
        database.where({data}).delete().table({table}).then(
            console.log('>>>> Exclusão realizada!')
        ).catch(err => {
            console.log(`Erro: ${err}.`);
        });
    }
}