const db = require('../database/conn/query')
const Cursos = require("../database/models/cursos")
const turmas = require('../database/models/Turmas')

class Turmas {
    index(req, res) {
        let sql_curso = `SELECT curso, CH FROM cursos;`
        let sql_turmas = `SELECT turma, modalidade, segmento FROM turmas;`
        db.query(sql_curso, (err, cursos) => {
            db.query(sql_turmas, (err, turmas) => {
                console.log(turmas)
                res.render('turmas/register', { cursos, turmas })
            })
        })
    }

    registerCursos(req, res) {
        Cursos.create(req.body)
            .then(() => {
                req.flash('success_msg', 'Curso Registrado com sucesso!')
                res.redirect('/turmas/register')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    registerTurmas(req, res) {
        turmas.create(req.body)
            .then(() => {
                req.flash('success_msg', 'Curso Registrado com sucesso!')
                res.redirect('/turmas/register')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    registerDisciplina(req,re){
        console.log(req.body)
    }


}


module.exports = new Turmas