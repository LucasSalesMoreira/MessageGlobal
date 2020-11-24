module.exports = class ConnectionDB {

    constructor() {
        this.mysql = require('mysql');
    }

    initConnection() {
        const host_db = '127.0.0.1';//process.env.host_db;
        const port_db = 3306;//process.env.port_db;
        const user_db = 'root';//process.env.user_db;
        const pass_db = null;//process.env.pass_db;
        const db = 'bd_messageglobal';//process.env.db;
        return this.mysql.createConnection({
            host: host_db,
            port: port_db,
            user: user_db,
            password: pass_db,
            database: db,
        });
    }

    searsh(sql) {
        const conn = this.initConnection();
        return new Promise((resolve, reject) => {
            conn.connect((error) => {
                if (error) {
                    reject(error);
                } else {
                    conn.query(sql, (query_error, results, fields) => {
                        if (query_error) {
                            conn.end();
                            reject(query_error);
                        } else {
                            conn.end();
                            console.log(`Resultado da busca -> ${JSON.stringify(results)}`);
                            resolve(results);
                        }
                    });
                }
            });
        })
    }

    execute(sql) {
        const conn = this.initConnection();
        return new Promise((resolve, reject) => {
            conn.connect((error) => {
                if (error) {
                    reject(error);
                } else {
                    conn.query(sql, (query_error, results, fields) => {
                        if (query_error) {
                            conn.end();
                            reject(query_error);
                        } else {
                            conn.end();
                            console.log('>>>> Query executada!');
                            resolve();
                        }
                    });
                }
            });
        });
    }
}