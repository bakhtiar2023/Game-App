const express = require('express')
const historyRoute = express.Router()
const historyController = require('./histories.controllers')
const historyValidator = require('./histories.validators')
const authentication = require('../middleware/authMiddleware')
const authorization = require('../middleware/protectionMiddleware')

// Api untuk mendapatkan history permainan user menggunakan userId
historyRoute.get(
  '/history/:userId',
  authentication,
  authorization,
  historyController.getHistory
)

// Api untuk mendapatkan history user dalam bentuk pdf
historyRoute.get(
  '/generatePdf/:userId',
  // authentication,
  // authorization,
  historyController.getPdf
)

// Api untuk menambahkan history permainan user
historyRoute.post(
  '/history/:userId',
  authentication,
  authorization,
  historyValidator.historyValidRules(),
  historyController.addHistory
)

module.exports = historyRoute
