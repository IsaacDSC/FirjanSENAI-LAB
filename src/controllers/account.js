//MODULES
const passport = require('passport')
    //FUNCTION OR CONST
const Admin = require('../database/models/Admin')
const bcrypt = require('bcrypt')

class Account {
    index(req, res) {
        res.render('account/login', { layout: 'account.hbs' })
    }

    login(req, res, next) {

        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/account/login',
            failureFlash: true
        })(req, res, next)
    }

    forgot(req, res) {
        res.render('account/forgot', { layout: 'account.hbs' })
    }

    logout(req, res) {
        req.logout()
        req.flash('success_msg', 'Deslogado com sucesso!')
        res.redirect('/account/login')
    }

    forgotRegister(req, res) {
        if (DATA_TOKEN[0] == undefined) {
            console.log('REDIRECT SEM TOKEN')
            res.redirect('/account/forgot')

        } else {
            Admin.findOne({ where: { username: req.body.username } }).then((user) => {
                if (!user) {
                    //console.log('não achou usuario!')
                    req.flash('error_msg', 'Usuário não encontrado!')
                    res.redirect('/account/forgot')
                }
                if (user.name == req.body.name) {
                    if (DATA_TOKEN[0].token) {
                        const pwd = DATA_TOKEN[0].token
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(pwd, salt, (err, hash) => {
                                if (err) {
                                    res.send('Erro ao criptogradar esta senha: ' + err)
                                } else {
                                    const pass = hash
                                    user.password = pass
                                    user.save().then(() => {
                                        //função para enviar username para o localstorage
                                        adminLocal.sendLocalStorage(user.username)
                                        res.redirect('/profile/account')
                                    }).catch((err) => {
                                        console.log('INSERT TOKEN IN DB ERROR: ' + err)
                                    })
                                }
                            })
                        })
                    }
                } else {
                    //console.log('senhas não batem')
                    req.flash('error_msg', 'Username ou Nome do Usuário errado.')
                    res.redirect('/account/forgot')
                }
            })
        }
    }

    verifyCredencials(req, res) {
        console.log(req.body)
        Admin.findOne({ where: { username: req.body.username } }).then((user) => {
            if (!user) {
                //console.log('não achou usuario!')
                req.flash('error_msg', 'Esta conta não Existe!')
                res.redirect('/profile')
            }
            bcrypt.compare(req.body.password, user.password, (err, batem) => {
                if (batem) {
                    res.redirect('/profile/account')
                } else {
                    //console.log('senhas não batem')
                    req.flash('error_msg', "E-mail ou Senha incorreta")
                    res.redirect('/profile')
                }
            })
        })
    }


}

module.exports = new Account