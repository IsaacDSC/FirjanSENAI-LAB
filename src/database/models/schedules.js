const db = require('../conn/sequelize')

const Schedule = db.define('schedules', {
    collaborator: {
        //key mull to admin
        type: db.Sequelize.STRING,
    },
    turma: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    activity: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    material: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    dateInit: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    dateFim: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: db.Sequelize.STRING,
        allowNull: false,
        defaultValue: 'AGENDADO'
    }
})

module.exports = Schedule 