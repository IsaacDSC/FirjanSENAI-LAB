const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { dataUser } = require('../../data/user')
    //models
const Admin = require('../database/models/Admin')

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        Admin.findOne({ where: { username: username } }).then((user) => {
            if (!user) {
                //console.log('não achou usuario!')
                return done(null, false, { message: 'Esta conta não Existe' })
            }
            bcrypt.compare(password, user.password, (err, batem) => {
                if (batem) {
                    dataUser(user.username, user.logo)
                    return done(null, user)
                } else {
                    //console.log('senhas não batem')
                    return done(null, false, { message: "E-mail ou Senha incorreta" })
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        //console.log('salvo id do usuario: ' + user.id)
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        //console.log('this:' + id)
        //done(id)
        Admin.findOne({ where: { id: id } }).then((user) => {
            done(null, user)
        })
    })
}