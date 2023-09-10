/* eslint-disable camelcase */
// eslint-disable-next-line camelcase
const { user_games, user_histories, user_rooms } = require('../db/models')
const { Op } = require('sequelize')

class HistoryModel {
  createHistory = async (status, userId) => {
    try {
      await user_histories.create({ status, userId })
      return true
    } catch (error) {
      console.log(error)
      return error
    }
  }

  getHistory = async (userId) => {
    try {
      const data = await user_histories.findAll({
        attributes: ['roomId', 'status', 'createdAt'],
        include: [
          {
            model: user_games,
            as: 'player',
            attributes: [
              ['id', 'playerId'],
              ['username', 'playerName']
            ]
          },
          {
            model: user_rooms,
            as: 'gameRoom',
            attributes: ['roomName']
          }
        ],
        where: { userId },
        order: [['createdAt', 'ASC']]
      })
      return data
    } catch (error) {
      return undefined
    }
  }

  recordHistory = async (status, userId, roomId) => {
    try {
      await user_histories.create({ status, userId, roomId })
      return true
    } catch (error) {
      return false
    }
  }

  getHistorybyUserIdAndRoomId = async (player2Id, roomID) => {
    try {
      const data = await user_histories.findOne({
        attributes: [
          ['userId', 'playerId'],
          'status',
          ['createdAt', 'dateTimeGame']
        ],
        include: [
          {
            model: user_rooms,
            as: 'gameRoom',
            attributes: [['id', 'roomId'], 'roomName']
          },
          {
            model: user_games,
            as: 'player',
            attributes: [
              ['id', 'playerId'],
              ['username', 'playerName']
            ]
          }
        ],
        where: {
          [Op.and]: [{ userId: player2Id.toString() }, { roomId: roomID }]
        }
      })
      return data
    } catch (error) {
      return undefined
    }
  }

  findByRoomId = async (roomId) => {
    try {
      const result = await user_histories.findOne({ where: { roomId } })
      return result
    } catch (error) {
      return undefined
    }
  }
}

module.exports = new HistoryModel()
