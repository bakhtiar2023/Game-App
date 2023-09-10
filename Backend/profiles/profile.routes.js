const express = require('express')
const profileRoute = express.Router()
const profileController = require('./profile.controllers')
const profileValidator = require('./profile.validators')
const authentication = require('../middleware/authMiddleware')
const authorization = require('../middleware/protectionMiddleware')

// Api untuk mendapatkan biodata user dengan menggunakan userID
profileRoute.get(
  '/profile/:userId',
  authentication,
  authorization,
  profileController.getProfile
)

// Api untuk membuat atau edit biodata user dengan mengguanakn userID
profileRoute.put(
  '/profile/:userId',
  authentication,
  authorization,
  profileValidator.bioValidRules(),
  profileController.addProfile
)

profileRoute.put(
  '/photo/:userId',
  authentication,
  authorization,
  profileValidator.photoValidRules(),
  profileController.uploadPhoto
)
module.exports = profileRoute
