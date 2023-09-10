const express = require('express')
const roomRouter = express.Router()
const roomController = require('./room.controllers')
const roomValidator = require('./room.validators')
const authentication = require('../middleware/authMiddleware')
const paramsChecker = require('../middleware/paramsChecker')

// Api untuk mendapatkan semua game rooms
roomRouter.post('/all_rooms/:page', authentication, roomValidator.getAllRoomValidRules(), roomController.getAllRooms)

// Api untuk membuat room
roomRouter.post(
  '/create_rooms',
  authentication,
  roomValidator.createRoomValidRules(),
  roomController.createRoom
)

// Api untuk mendapatkan room menggunakan roomId
roomRouter.get(
  '/get_rooms/:roomId',
  authentication,
  paramsChecker,
  roomController.getRoom
)

// Api untuk player2 memasukkan pilihan dan mendapatkan hasil dari permainan
roomRouter.put(
  '/edit_rooms/:roomId',
  authentication,
  paramsChecker,
  roomValidator.updateRoomValidRules(),
  roomController.updateRoom
)

module.exports = roomRouter
