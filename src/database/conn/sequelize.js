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
})
    

module.exports = connection