const express = require('express')
const router = express.Router()

const { auth } = require('../middlewares/auth')

const home = require('../controllers/home')
const SENAILAB = require('../controllers/senaiLab')
const account = require('../controllers/account')
const profile = require('../controllers/profile')
const config = require('../controllers/config')
const turmas = require('../controllers/turmas')

//REGISTER TURMAS
router.get('/turmas/register', turmas.index)
router.post('/turmas/register/curso', turmas.registerCursos)
router.post('/turmas/register/turma', turmas.registerTurmas)
router.post('/turmas/register/disciplina', turmas.registerDisciplina)

//DASHBOARD ADMINISTRATIVO
router.get('/', home.redirect)
router.get('/system', auth, home.index)

//INITIAL SENAI LAB II
router.get('/SENAILAB', SENAILAB.index)
router.get('/SENAILAB/schedule', auth, SENAILAB.schedule)
router.post('/SENAILAB/schedule', auth, SENAILAB.register)
router.post('/SENAILAB/schedule/cancel', auth, SENAILAB.cancel)
router.post('/SENAILAB/schedule/delete', auth, SENAILAB.delete)

//ACCOUNT LOGIN ACESS APLICATION
router.get('/account/login', account.index)
router.post('/account/login', account.login)
router.get('/account/logout', account.logout)

//DASHBOARD PROFILES 
router.get('/profile', auth, profile.index)

//CONFIG
router.get('/config',auth, config.index )
router.post('/config/collaborators/register', auth, config.registerCollaborators)
router.post('/config/collaborators/delete', auth, config.deleteCollaborators)


module.exports = router