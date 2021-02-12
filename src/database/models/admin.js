const db = require('../conn/sequelize')

const Admin = db.define('admin', {
    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    profile: {
        type: db.Sequelize.STRING,
    },
    username: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
        unique: true
    },
    email: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
        unique: true,
        defaultValue:'@firjan.com.br' 
    },
    password: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },
    superuser: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: false,
    },

})

module.exports = Admin