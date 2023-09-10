const express = require('express')
const userRoute = express.Router()
const userController = require('./user.controllers')
const userValidator = require('./user.validators')

// Api untuk login
userRoute.post('/login', userValidator.loginValidRules(), userController.getLogin)

// Api untuk regitration
userRoute.post('/registration', userValidator.registrationValidRules(), userController.getRegister)

module.exports = userRoute
