const bcrypt = require('bcrypt')

const Admin = require('./models/admin')
const Schedule = require('./models/schedules')
const Posts = require('./models/Posts')
const Cursos = require('./models/cursos')
const Disciplinas = require('./models/Disciplinas')
const Turmas = require('./models/Turmas')
const Docentes = require('./models/DocenteDisciplina')

const db = require('./conn/query')
const { CONFIG } = require('../settings/settings')
//const TABLES = [Admin, Schedule, Posts, Cursos, Disciplinas, Turmas, Docentes ]
const TABLES = [Cursos, Disciplinas, Turmas, Docentes]


const dbRun = () => {
    if (CONFIG.createDB == true) {
        let SQL = `CREATE DATABASE SENAI;`
        db.query(SQL, (err, result) => {
            if (err) console.log('ERRO AO CRIAR DATABASE: ' + err)
            else console.log('DATABASE CRIADA COM SUCESSO!')
        })
    }

    if (CONFIG.createTable == true) {
        TABLES.forEach(element => {
            element.sync({ force: true })
        })
    }
}

const SUPERUSER = () => {
    const pwd = 'secret'
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pwd, salt, (err, hash) => {
            if (err) {
                res.send('Erro ao criptogradar esta senha: ' + err)
            } else {
                const pass = hash
                Admin.create({
                    name: 'administrator',
                    username: 'admin',
                    telephone: '99999999',
                    password: pass,
                    superuser: true
                }).then(() => {
                    console.log(' CREATED SUPERUSER')
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    })
}


module.exports = { dbRun, SUPERUSER }
