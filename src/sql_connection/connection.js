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

    results: null,

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
    },

    login: function(data, socket) {
        this.searsh(`select * from User where email = '${data.email}' and password = '${data.password}'`);
        setTimeout(() => {
            if (this.results) {
                if (this.results.email === data.email && this.results.password === data.password) {
                    socket.emit('login', {ok: true});
                } else {
                    socket.emit('login', {ok: false});
                }
            } else {
                socket.emit('login', {ok: false});
            }

            this.results = null;
        }, 1500);
    },

    authenticate: function(data, socket) {
        this.searsh(`select * from authentication where code = ${data.code}`);
        setTimeout(() => {
            if (this.results) {
                console.log(data.email+' --- '+this.results.email);

                if (data.email === this.results.email) {
                    this.create(`insert into User (name, email, password) values ('${this.results.name}', '${this.results.email}', '${data.password}')`);
                    this.delete(`delete from authentication where code = '${this.results.code}'`);
                    const path = require('path');
                    const Manager = require(path.resolve('src/fileManager/Manager.js'));
                    new Manager().createMessageFile(this.results.email);
                    socket.emit('_authenticating', {ok: true});
                } else {
                    socket.emit('_authenticating', {ok: false});
                }

                this.results = null;
            } else {
                socket.emit('_authenticating', {ok: false});
            }
        }, 1500);
    },

    loadContacts: function(email, socket) {
        this.searsh(`select email_contact from contacts where email_user = '${email}'`);
        setTimeout(() => {
            console.log(this.results);    
        }, 1500);
    }
};