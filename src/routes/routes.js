const express = require('express')
const router = express.Router()

const home = require('../controllers/home')
const SENAILAB = require('../controllers/senaiLab')

router.get('/', home.index)

router.get('/SENAILAB', SENAILAB.index)


module.exports = router