const { body } = require('express-validator')
const roomModel = require('./room.models')
const historyModel = require('../histories/histories.models')

class RoomValidator {
  createRoomValidRules = () => {
    return [
      body('roomName').notEmpty().withMessage('Please input roomName'),
      body('player1Choice')
        .notEmpty()
        .withMessage('Please input your choice as player 1')
        .isIn(['rock', 'paper', 'scissors'])
        .withMessage('Choice contain : rock/paper/scissors')
    ]
  }

  getAllRoomValidRules = () => {
    return [
      body('filtered')
        .optional()
        .isBoolean()
        .withMessage('please input filtered with boolean true or false')
        .isIn([true, false])
        .withMessage('please input filtered with boolean true or false')
    ]
  }

  updateRoomValidRules = () => {
    return [
      body('player2Choice')
        .notEmpty()
        .withMessage('Please input your choice as player 2')
        .isIn(['rock', 'paper', 'scissors'])
        .withMessage('Choice contain : rock/paper/scissors')
    ]
  }

  isPlayer1 = async (roomId, player2Id) => {
    const result = await roomModel.findByRoomId(roomId)
    if (result === undefined) {
      return undefined
    } else if (result === null) {
      return null
    }

    const player1Id = result.player1Id.toString()
    if (player1Id === player2Id && result.player2Id !== null) {
      return true
    } else if (player1Id === player2Id && result.player2Id === null) {
      return true
    } else if (player1Id !== player2Id && result.player2Id !== null) {
      return true
    } else {
      return false
    }
  }

  whoseWin = async (roomId) => {
    const data = await roomModel.findByRoomId(roomId)
    const status = ['win', 'draw', 'lose']

    if (data === undefined) {
      return undefined
    }

    const player1Choice = data.player1Choice
    const player2Choice = data.player2Choice
    const player1Id = data.player1Id
    const player2Id = data.player2Id

    if (player1Choice === player2Choice) {
      const recordedPlayer1d = await historyModel.recordHistory(
        status[1],
        player1Id,
        roomId
      )
      const recordedPlayer2d = await historyModel.recordHistory(
        status[1],
        player2Id,
        roomId
      )
      if (recordedPlayer1d === true && recordedPlayer2d === true) {
        return true
      }
      return false
    }

    if (player1Choice === 'rock' && player2Choice === 'scissors') {
      const recordedPlayer1d = await historyModel.recordHistory(
        status[0],
        player1Id,
        roomId
      )
      const recordedPlayer2d = await historyModel.recordHistory(
        status[2],
        player2Id,
        roomId
      )
      if (recordedPlayer1d === true && recordedPlayer2d === true) {
        return true
      }
      return false
    } else if (player1Choice === 'rock' && player2Choice === 'paper') {
      const recordedPlayer1d = await historyModel.recordHistory(
        status[2],
        player1Id,
        roomId
      )
      const recordedPlayer2d = await historyModel.recordHistory(
        status[0],
        player2Id,
        roomId
      )
      if (recordedPlayer1d === true && recordedPlayer2d === true) {
        return true
      }
      return false
    } else if (player1Choice === 'paper' && player2Choice === 'rock') {
      const recordedPlayer1d = await historyModel.recordHistory(
        status[0],
        player1Id,
        roomId
      )
      const recordedPlayer2d = await historyModel.recordHistory(
        status[2],
        player2Id,
        roomId
      )
      if (recordedPlayer1d === true && recordedPlayer2d === true) {
        return true
      }
      return false
    } else if (player1Choice === 'paper' && player2Choice === 'scissors') {
      const recordedPlayer1d = await historyModel.recordHistory(
        status[2],
        player1Id,
        roomId
      )
      const recordedPlayer2d = await historyModel.recordHistory(
        status[0],
        player2Id,
        roomId
      )
      if (recordedPlayer1d === true && recordedPlayer2d === true) {
        return true
      }
      return false
    } else if (player1Choice === 'scissors' && player2Choice === 'paper') {
      const recordedPlayer1d = await historyModel.recordHistory(
        status[0],
        player1Id,
        roomId
      )
      const recordedPlayer2d = await historyModel.recordHistory(
        status[2],
        player2Id,
        roomId
      )
      if (recordedPlayer1d === true && recordedPlayer2d === true) {
        return true
      }
      return false
    } else if (player1Choice === 'scissors' && player2Choice === 'rock') {
      const recordedPlayer1d = await historyModel.recordHistory(
        status[2],
        player1Id,
        roomId
      )
      const recordedPlayer2d = await historyModel.recordHistory(
        status[0],
        player2Id,
        roomId
      )
      if (recordedPlayer1d === true && recordedPlayer2d === true) {
        return true
      }
      return false
    } else {
      return false
    }
  }
}

module.exports = new RoomValidator()
