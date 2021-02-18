const db = require('../database/conn/query')
const { DATA } = require('../../data/user')

class Profile {
    index(req, res) {
        console.log("USERNAME: "+ DATA.username)
        let sql_admin = `SELECT name, profile, username, email FROM senai.admins WHERE username = '${DATA.username}';`
        let sql_schedules = `SELECT * FROM schedules WHERE collaborator = '${DATA.username}' AND status = 'AGENDADO' OR status = 'CANCELADO'`
        db.query(sql_admin, (err, admin)=>{
            db.query(sql_schedules, (err, schedules)=>{
                console.log(schedules)
                res.render('profile/profile', { admin: admin[0], schedules })
            })
        })
    }

}


module.exports = new Profile 