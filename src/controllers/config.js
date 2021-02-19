//MODULES
const bcrypt = require('bcrypt')
//DATABASES OR MODELS OR TABLES
const Admin = require('../database/models/Admin')
const db = require('../database/conn/query')
const { DATA } = require('../../data/user')
// FUNCTIONS OR VARIABLES

class Settings {
    index(req, res) {
        let sql_admins = `SELECT name, profile, superuser, username, email FROM senai.admins WHERE username = '${DATA.username}';`
        try {
            db.query(sql_admins, (err, admins) => {               
                  if (admins[0].superuser == true) {
                      const SUPERUSER = 1
                      res.render('settings/config', { admin: DATA,  admins, SUPERUSER })
                  }
                  if (admins[0].superuser == false) {
                      res.render('settings/config', { admin: DATA,  admins })
                  }
            })

        } catch (error) {
            registerError.now(error, 'home.index', '/config', 'GET')
        }
    }

    async registerCollaborators(req, res) {
        try {
            let sql = `SELECT username FROM admins WHERE username = '${req.body.username}';`
            db.query(sql, (err, result) => {
                if (err) registerError.now(err, 'Settings.registerEmployee', '/config/employees/register', 'POST')
                if (result != '') {
                    req.flash('error_msg', 'Username já registrado, tente outro novamente.')
                    res.redirect('/config')
                } else {
                    const pwd = req.body.username
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(pwd, salt, (err, hash) => {
                            if (err) {
                                res.send('Erro ao criptogradar esta senha: ' + err)
                            } else {
                                const pass = hash
                                Admin.create({
                                    logo: '/images/profile/profile.png',
                                    name: req.body.name,
                                    telephone: req.body.telephone,
                                    username: req.body.username,
                                    password: pass,
                                    superuser: req.body.superuser
                                }).then(() => {
                                    req.flash('success_msg', 'Funcionário cadastrado com sucesso!')
                                    res.redirect('/config')
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        })
                    })
                }
            })
        } catch (error) {
            registerError.now(error, 'Settings.registerEmployee', '/config/employees/register', 'POST')
        }

    }

    async deleteCollaborators(req, res) {
        if (req.body.employeed == DATA.username) {
            req.flash('error_msg', 'Usuario não pode ser retirado do sistema!')
            return res.redirect('/config')
        } else {
            let sql = `DELETE FROM admins WHERE (username = '${req.body.employeed}');`
            db.query(sql, (err, result) => {
                if (err) registerError.now(error, 'Settings.deleteEmployee', '/config/employees/delete', 'POST')
                else {
                    req.flash('success_msg', 'Usuários retidado do sistema com sucesso!')
                    res.redirect('/config')
                }
            })
        }

    }
}


module.exports = new Settings