const db = require('../conn/sequelize')

const Schedule = db.define('schedules', {
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
    dateInit: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Schedule 