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

    async deleteEmployee(req, res) {
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

    /*  async registerClass(req, res) {
         if (req.body.classe.trim() == null || req.body.classe.trim() == undefined || req.body.classe.trim() == '') {
             req.flash('error_msg', 'Você não pode salvar uma classe com o campo vazio')
             res.redirect('/config')
         } else {
             let classe = req.body.classe.toUpperCase()
             classMenu.create({
                 classMenu: classe
             }).then(() => {
                 req.flash('success_msg', 'Classe Salva com Sucesso')
                 res.redirect('/config')
             }).catch((err) => {
                 req.flash('error_msg', "Preencha o campo corretamente")
                 res.redirect('/config')
                 registerError.now(err, 'settings.registerClass', '/config/classe', 'POST')
                 console.log(err)
             })
         }
     }
 
     editClass(req, res) {
         if (req.body.classe.trim() == '') {
             req.flash('error_msg', 'Você não pode cadastrar um classe em branco')
             res.redirect('/config')
         } else {
             ClassMenu.findOne({ where: { id: req.body.id } })
                 .then((classe) => {
                     classe.classMenu = req.body.classe
                     classe.save().then(() => {
                         req.flash('success_msg', 'Classe do cardápio editada com sucesso!')
                         res.redirect('/config')
                     }).catch((err) => console.log(err))
                 }).catch((err) => console.log(err))
         }
 
     }
 
     deleteClass(req, res) {
         console.log(req.body.id)
 
         let sql = `DELETE FROM classMenus WHERE (id = '${req.body.id}');`
         db.query(sql, (err, result) => {
             if (err) res.redirect('/config')
             else {
                 req.flash('success_msg', 'Classe deletado do cardápio com sucesso!')
                 res.redirect('/config')
             }
         })
     }
 
    
 
    
 
 
     async generalConf(req, res) {
         let SQL;
         if (req.body.neighborhood) {
             SQL = `UPDATE configurations SET neighborhood = '${req.body.neighborhood}';`
         }
         if (req.body.description) {
             SQL = `UPDATE configurations SET description = '${req.body.description}';`
         }
         if (req.body.classMenu) {
             SQL = `UPDATE configurations SET classMenu = '${req.body.classMenu}';`
         }
 
         try {
             await db.query(SQL, (err, update) => { })
 
             res.status(200).send('Alterado Com sucesso')
 
         } catch (error) {
             console.log('Set Bairro' + error)
             registerError.now(error, 'settings.setConfig', '/', 'POST')
             res.status(400).send('Falha ao alterar Bairro')
         }
     }
  */
}


module.exports = new Settings