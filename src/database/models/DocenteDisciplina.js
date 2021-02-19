const db = require('../conn/sequelize')

const DocenteDisciplina = db.define('docentesDisciplinas', {
    Turma: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    docente: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    disciplina: {
        type: db.Sequelize.STRING,
        allowNull: false  
    },    
    dataInicio: {
        type: db.Sequelize.STRING,  
    },
    dataFim: {
        type: db.Sequelize.STRING,  
    },
})

module.exports = DocenteDisciplina