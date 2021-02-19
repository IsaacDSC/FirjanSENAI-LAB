const db = require('../conn/sequelize')

const cursos = db.define('cursos', {
    curso: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    CH: {
        type: db.Sequelize.STRING,
    },    

})

module.exports = cursos