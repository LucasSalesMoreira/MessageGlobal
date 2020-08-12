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
    //select
    searsh: function() {
        var conn = this.connectDataBase();
        if (conn) {
            conn.query("select * from User", (error, results, fields) => {
                if (error) {
                    console.log('>>>> Falha na busca');
                    console.log(error);
                    conn.end();
                } else {
                    console.log('>>>> Busca realizada!');
                    console.log(results);
                    conn.end();
                }
            });
        }
    } 
    //update
    //delet
};

//console.log(connection.connect());
connection.searsh();
//module.exports = connection;