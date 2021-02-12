const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const cors = require('cors')
const passport = require('passport')

require('../middlewares/passport')(passport)
const router = require('../routes/routes')
const { CONFIG } = require('../settings/settings')
const { dbRun, SUPERUSER } = require('../database/createTables')

class App {
    constructor() {
        this.express = express()
        this.midlewares()
        this.session()
        this.flash()
        this.routes()
        this.static()
        this.engine()
        this.config()
    }
    midlewares() {
        //this.express.use(bodyParser.urlencoded({ extended: true }))
        //this.express.use(bodyParser.json())
        this.express.use(express.json())
        this.express.use(cors())
    }
    session() {
        this.express.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }))
    }
    flash() {
        //config Flahs
        this.express.use(flash())
        //config midleware flash
        this.express.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            res.locals.message = req.flash('message')
            res.locals.error = req.flash('error')
            next()
        })

    }

    passport() {
        this.express.use(passport.initialize())
        this.express.use(passport.session())
    }

    routes() {
        this.express.use(router)
    }

    static() {
        this.express.use(express.static(path.join(__dirname, '../', 'public')))
    }

    engine() {
        this.express.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
        this.express.set('view engine', 'hbs');
        this.express.set("views", path.join(__dirname, '../', "/views/"))
    }

    config() {
        if (CONFIG.active == true) dbRun()
        if(CONFIG.active == true && CONFIG.createAdmin == true)SUPERUSER() 
    }
}


module.exports = new App().express