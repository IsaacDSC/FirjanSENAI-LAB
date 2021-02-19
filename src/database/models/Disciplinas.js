const db = require('../conn/sequelize')

const Disciplinas = db.define('disciplinas', {
    Turma: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    disciplinas: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    CH: {
        type: db.Sequelize.STRING,
        allowNull: false  
    },    
    OBS: {
        type: db.Sequelize.TEXT,  
    },
})

module.exports = Disciplinas