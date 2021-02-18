const mysql = require('mysql2')


const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'senai',
        user: 'root',
        password: 'root',
/*     host: 'db4free.net',
    port: '3306',
    database: 'senai_lab2',
    user: 'senai_lab2',
    password: 'secret(!@#)', */
})



module.exports = connection