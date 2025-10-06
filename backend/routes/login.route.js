const {loginController} = require('../controllers/login.controller')

const express = require('express') 
const router = express.Router()

router.post('/', loginController)

module.exports = {loginRouter: router}