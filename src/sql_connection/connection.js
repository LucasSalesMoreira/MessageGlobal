const connection = {
    //connect
    connectDataBase: function() {
        const mysql = require('mysql');
        const host_db = process.env.host_db;
        const port_db = process.env.port_db;
        const user_db = process.env.user_db;
        const pass_db = process.env.pass_db;
        const db = process.env.db;
        return mysql.createConnection({
            host: host_db, 
            port: port_db, 
            user: user_db, 
            password: pass_db,
            database: db,
        });
    },

    //insert
    create: function(sql) {
        var conn = this.connectDataBase();
        if (conn) {
            conn.query(sql, (error, results, fields) => {
                if (error) {
                    console.log('>>>> Falha ao executar a query: '+sql);
                    console.log(error);
                    conn.end();
                } else {
                    console.log('>>>> Cadastro realizado!');
                    conn.end();
                }
            });
        } else {
            console.log('>>>> Falha na conexão com o banco de dados!');
        }
    },

    //select
    searsh: function(sql) {
        var conn = this.connectDataBase();
        if (conn) {
            conn.query(sql, (error, results, fields) => {
                if (error) {
                    console.log('>>>> Falha ao executar a query: '+sql);
                    console.log(error);
                    conn.end();
                } else {
                    console.log('>>>> Busca realizada!');
                    console.log(results);
                    conn.end();
                }
            });
        } else {
            console.log('>>>> Falha na conexão com o banco de dados!');
        }
    },

    //update
    update: function(sql) {
        var conn = this.connectDataBase();
        if (conn) {
            conn.query(sql, (error, results, fields) => {
                if (error) {
                    console.log('>>>> Falha ao executar a query: '+sql);
                    console.log(error);
                    conn.end();
                } else {
                    console.log('>>>> Atualização realizada!');
                    conn.end();
                }
            });
        } else {
            console.log('>>>> Falha na conexão com o banco de dados!');
        }
    },
    
    //delete
    delete: function(sql) {
        var conn =  this.connectDataBase();
        if (conn) {
            conn.query(sql, (error, results, fields) => {
                if (error) {
                    console.log('>>>> Falha ao executar a query: '+sql);
                    console.log(error);
                    conn.end();
                } else {
                    console.log('>>>> Exclusão realizada!');
                    conn.end();
                }
            });
        } else {
            console.log('>>>> Falha na conexão com o banco de dados!');
        }
    }
};

module.exports = connection;