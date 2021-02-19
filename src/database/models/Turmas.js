const db = require('../conn/sequelize')

const Turmas = db.define('turmas', {
    curso: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,    
    },
    turma: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    modalidade: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,       
    },
    segmento: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,             
    },   

})

module.exports = Turmas