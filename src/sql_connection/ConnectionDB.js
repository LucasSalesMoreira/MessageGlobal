module.exports = class ConnectionDB {

    constructor() {
        this.mysql = require('mysql');
        this.promisify = require('util').promisify;
        const conn = this.initConnection();
        this.connectPromisi = this.promisify(conn.connect);
        this.queryPromisi = this.promisify(conn.query);
    }

    initConnection() {
        const host_db = process.env.host_db;
        const port_db = process.env.port_db;
        const user_db = process.env.user_db;
        const pass_db = process.env.pass_db;
        const db = process.env.db;
        return this.mysql.createConnection({
            host: '',//host_db,
            port: 3306,//port_db, 
            user: 'root',//user_db,
            password: null,//pass_db,
            database: 'bd'//db,
        });
    }

    //insert
    async searsh(sql) {
        try {
            await this.connectPromisi();
    
            try {
                var results = await this.queryPromisi(sql);
                console.log(results);    
            } catch (error) {
                console.log(error);
            }
        
        } catch (error) {
            console.log(`Falha na conexão -> ${error}`);
        }
    }
}