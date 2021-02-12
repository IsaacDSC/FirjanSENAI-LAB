const express = require('express')
const router = express.Router()

const home = require('../controllers/home')
const SENAILAB = require('../controllers/senaiLab')

router.get('/system', home.index)

router.get('/SENAILAB', SENAILAB.index)
router.get('/SENAILAB/schedule', SENAILAB.schedule)
router.get('/profile', SENAILAB.profile)


module.exports = router