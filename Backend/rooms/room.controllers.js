const roomModel = require('./room.models')
const { validationResult } = require('express-validator')
const roomValidator = require('./room.validators')
const historyModel = require('../histories/histories.models')

class RoomController {
  getAllRooms = async (req, res) => {
    const { page } = req.params
    const paginate = (page - 1) * 9
    const { filtered } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }

    if (filtered === undefined) {
      const result = await roomModel.findAllRooms(paginate)
      if (result === undefined) {
        return res.status(500).json({ message: 'Internal server error' })
      } else {
        return res.status(200).json({ message: result })
      }
    } else if (filtered === true) {
      const result = await roomModel.findAllOpenRooms(paginate)
      if (result === undefined) {
        return res.status(500).json({ message: 'Internal server error' })
      } else {
        return res.status(200).json({ message: result })
      }
    } else {
      const result = await roomModel.findAllClosedRooms(paginate)
      if (result === undefined) {
        return res.status(500).json({ message: 'Internal server error' })
      } else {
        return res.status(200).json({ message: result })
      }
    }
  }

  getRoom = async (req, res) => {
    const { roomId } = req.params
    const data = await roomModel.getOneRoom(roomId)
    if (data === null) {
      return res.status(404).json({ message: 'Game room not found' })
    } else if (data === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      return res.status(200).json({ message: data })
    }
  }

  createRoom = async (req, res) => {
    const player1Id = req.token.id.toString()
    const { roomName, player1Choice } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }

    const result = await roomModel.findRoomByRoomName(roomName)
    if (result === null) {
      const created = await roomModel.createRooms(
        roomName,
        player1Id,
        player1Choice
      )
      if (created === true) {
        return res.status(200).json({ message: 'Room successfully created' })
      }
      return res.status(500).json({ message: 'Internal server error' })
    } else if (result === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    }
    return res.status(400).json({ message: 'roomName already used' })
  }

  updateRoom = async (req, res) => {
    const { roomId } = req.params
    const player2Id = req.token.id.toString()
    const { player2Choice } = req.body
    const errors = validationResult(req)

    const resultRole = await roomValidator.isPlayer1(roomId, player2Id)
    if (resultRole === null) {
      return res.status(404).json({ message: 'Room not found' })
    } else if (resultRole === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    } else if (resultRole === true) {
      return res
        .status(400)
        .json({ message: 'You Cant input choice as player2' })
    }

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }

    const updated = await roomModel.updateRoom(
      player2Id,
      player2Choice,
      roomId
    )
    if (updated === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    const resultGame = await roomValidator.whoseWin(roomId)
    if (resultGame === false || resultGame === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    const result = await historyModel.getHistorybyUserIdAndRoomId(
      player2Id,
      roomId
    )
    if (result === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    }
    return res.status(200).json({ message: result })
  }
}

module.exports = new RoomController()
