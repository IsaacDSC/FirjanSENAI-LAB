const express = require('express')
const router = express.Router()

const { auth } = require('../middlewares/auth')

const home = require('../controllers/home')
const SENAILAB = require('../controllers/senaiLab')
const account = require('../controllers/account')

//DASHBOARD ADMINISTRATIVO
router.get('/system', home.index)

//INITIAL SENAI LAB II
router.get('/SENAILAB', SENAILAB.index)
router.get('/SENAILAB/schedule', SENAILAB.schedule)

//ACCOUNT LOGIN ACESS APLICATION
router.get('/account/login', account.index)
router.post('/account/login', account.login)
router.get('/account/logout', account.logout)

//DASHBOARD PROFILES 
router.get('/profile', SENAILAB.profile)


module.exports = router