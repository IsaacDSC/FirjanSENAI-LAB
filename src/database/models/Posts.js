const db = require('../conn/sequelize')

const Schedule = db.define('posts', {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    img:{
        type: db.Sequelize.STRING,
        allowNull: false
    }
   
})

module.exports = { Schedule }