const Sequelize = require('sequelize')

const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'senai',
    username: 'root',
    password: 'root',
    define: {
        timestamps: true
    }

/*     host: 'db4free.net',
    port: '3306',
    database: 'senai_lab2',
    username: 'senai_lab2',
    password: 'secret(!@#)',
    define: {
        timestamps: true
    } */
})


module.exports = connection