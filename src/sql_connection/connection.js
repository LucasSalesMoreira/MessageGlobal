const connection = {
    //connect
    connectDataBase: function() {
        const mysql = require('mysql'); 
        return mysql.createConnection({
            host: 'mysql669.umbler.com', 
            port: 41890, 
            user: 'lucassales', 
            password: 'lucasemikaio', 
            database: 'bd_messageglobal'
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