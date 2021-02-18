const schedules = require('../database/models/schedules')
const { DATA } = require('../../data/user')
const db = require('../database/conn/query')

class SenaiLab {
    index(req, res) {
        res.render('SenaiLab/senaiLab', { layout: 'senaiLab.hbs' })
    }
    schedule(req, res) {
        res.render('SenaiLab/schedule', { layout: 'senaiLab.hbs' })
    }
    register(req, res) {
        console.log(req.body)
        schedules.create({
            collaborator: DATA.username,
            turma: req.body.turma,
            activity: req.body.atividade,
            material: req.body.material,
            date: req.body.date,
            dateInit: req.body.hrInicio,
            dateFim: req.body.hrFim
        })
            .then(() => res.redirect('/'))
            .catch((err) => console.log(err))
    }

    cancel(req, res) {
        console.log('\n\n' + req.body.id)
          let sql = `UPDATE schedules SET status = 'CANCELADO' WHERE (id = '${req.body.id}');`
          db.query(sql, (err, result) => {
              if (err) console.log(err)
              req.flash('success_msg', 'Agenda cancelado com suceso!')
              res.redirect('/profile')
          })
    }

    delete(req, res) {
        console.log('\n\n' + req.body.id)
         let sql = `UPDATE schedules SET status = 'DELETADO' WHERE (id = '${req.body.id}');`
         db.query(sql, (err, result) => {
             if (err) console.log(err)
             req.flash('success_msg', 'Agenda deletado com suceso!')
             res.redirect('/profile')
         })
    }
}


module.exports = new SenaiLab