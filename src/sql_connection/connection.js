module.exports = {
    //connect
    initConnection: function() {
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
        var conn = this.initConnection();
        conn.connect((error) => {
            if (error) {
                console.log(`Falha na conexão -> ${error}`);
            } else {
                conn.query(sql, (query_error, results, fields) => {
                    if (query_error) {
                        console.log('>>>> Falha ao executar a query: '+sql);
                        console.log(query_error);
                        conn.end();
                    } else {
                        console.log('>>>> Cadastro realizado!');
                        conn.end();
                    }
                });
            }
        });
    },

    //select
    searsh: function(sql) {
        var conn = this.initConnection();
        conn.connect((error) => {
            if (error) {
                console.log(`Falha na conexão -> ${error}`);
            } else {
                conn.query(sql, (query_error, results, fields) => {
                    if (query_error) {
                        console.log('>>>> Falha ao executar a query: '+sql);
                        console.log(query_error);
                        conn.end();
                    } else {
                        console.log('>>>> Busca realizada!');
                        this.results = results[0];
                        conn.end();
                    }
                });
            }
        });
    },

    results: '',

    authenticate: function(data, socket) {
        this.searsh(`select * from authentication where code = ${data.code}`);
        setTimeout(() => {
            if (data.code === this.results.code && data.email === this.results.email)
                socket.emit('_authenticating', {ok: true});
            else
                socket.emit('_authenticating', {ok: false});
        }, 1500);
    },

    //update
    update: function(sql) {
        var conn = this.initConnection();
        conn.connect((error) => {
            if (error) {
                console.log(`Falha na conexão -> ${error}`);
            } else {
                conn.query(sql, (query_error, results, fields) => {
                    if (query_error) {
                        console.log('>>>> Falha ao executar a query: '+sql);
                        console.log(query_error);
                        conn.end();
                    } else {
                        console.log('>>>> Atualização realizada!');
                        conn.end();
                    }
                });
            }
        });
    },
    
    //delete
    delete: function(sql) {
        var conn =  this.initConnection();
        conn.connect((error) => {
            if (error) {
                console.log(`Falha na conexão -> ${error}`);
            } else {
                conn.query(sql, (query_error, results, fields) => {
                    if (query_error) {
                        console.log('>>>> Falha ao executar a query: '+sql);
                        console.log(query_error);
                        conn.end();
                    } else {
                        console.log('>>>> Exclusão realizada!');
                        conn.end();
                    }
                });
            }
        });
    }
};