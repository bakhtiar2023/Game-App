// eslint-disable-next-line camelcase
const { user_games, user_histories, user_rooms } = require('../db/models')
const { Op } = require('sequelize')

class RoomModel {
  findByRoomId = async (roomId) => {
    try {
      // eslint-disable-next-line camelcase
      const result = await user_rooms.findOne({ where: { id: roomId } })
      return result
    } catch (error) {
      return undefined
    }
  }

  updateRoom = async (player2Id, player2Choice, roomId) => {
    try {
      // eslint-disable-next-line camelcase
      await user_rooms.update(
        { player2Id, player2Choice },
        { where: { id: roomId } }
      )
      return true
    } catch (error) {
      return undefined
    }
  }

  findAllRooms = async (paginate) => {
    try {
      // eslint-disable-next-line camelcase
      const data = await user_rooms.findAll({
        attributes: [
          ['id', 'roomId'],
          'roomName',
          'player1Id',
          'player1Choice',
          'player2Id',
          'player2Choice'
        ],
        offset: paginate,
        limit: 9,
        order: [['id', 'ASC']],
        include: [
          {
            // eslint-disable-next-line camelcase
            model: user_histories,
            as: 'resultGames',
            attributes: [['userId', 'playerId'], 'status', 'createdAt']
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player1Games',
            attributes: [
              ['id', 'player1Id'],
              ['username', 'player1Name']
            ]
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player2Games',
            attributes: [
              ['id', 'player2Id'],
              ['username', 'player2Name']
            ]
          }
        ]
      })
      return data
    } catch (error) {
      return undefined
    }
  }

  findAllOpenRooms = async (paginate) => {
    try {
      // eslint-disable-next-line camelcase
      const data = await user_rooms.findAll({
        attributes: [
          ['id', 'roomId'],
          'roomName',
          'player1Id',
          'player1Choice',
          'player2Id',
          'player2Choice'
        ],
        offset: paginate,
        limit: 9,
        order: [['id', 'ASC']],
        where: {
          player2Id: {
            [Op.eq]: null
          }
        },
        include: [
          {
            // eslint-disable-next-line camelcase
            model: user_histories,
            as: 'resultGames',
            attributes: [['userId', 'playerId'], 'status', 'createdAt']
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player1Games',
            attributes: [
              ['id', 'player1Id'],
              ['username', 'player1Name']
            ]
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player2Games',
            attributes: [
              ['id', 'player2Id'],
              ['username', 'player2Name']
            ]
          }
        ]
      })
      return data
    } catch (error) {
      return undefined
    }
  }

  findAllClosedRooms = async (paginate) => {
    try {
      // eslint-disable-next-line camelcase
      const data = await user_rooms.findAll({
        attributes: [
          ['id', 'roomId'],
          'roomName',
          'player1Id',
          'player1Choice',
          'player2Id',
          'player2Choice'
        ],
        offset: paginate,
        limit: 9,
        order: [['id', 'ASC']],
        where: {
          player2Id: {
            [Op.ne]: null
          }
        },
        include: [
          {
            // eslint-disable-next-line camelcase
            model: user_histories,
            as: 'resultGames',
            attributes: [['userId', 'playerId'], 'status', 'createdAt']
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player1Games',
            attributes: [
              ['id', 'player1Id'],
              ['username', 'player1Name']
            ]
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player2Games',
            attributes: [
              ['id', 'player2Id'],
              ['username', 'player2Name']
            ]
          }
        ]
      })
      return data
    } catch (error) {
      return undefined
    }
  }

  getOneRoom = async (roomId) => {
    try {
      // eslint-disable-next-line camelcase
      const data = user_rooms.findOne({
        attributes: [['id', 'roomId'], 'roomName', 'player1Id', 'player2Id'],
        include: [
          {
            // eslint-disable-next-line camelcase
            model: user_histories,
            as: 'resultGames',
            attributes: [['userId', 'playerId'], 'status', 'createdAt']
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player1Games',
            attributes: [
              ['id', 'player1Id'],
              ['username', 'player1Name']
            ]
          },
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'player2Games',
            attributes: [
              ['id', 'player2Id'],
              ['username', 'player2Name']
            ]
          }
        ],
        where: { id: roomId }
      })
      if (data.length < 1) {
        return null
      }
      return data
    } catch (error) {
      return undefined
    }
  }

  findRoomByRoomName = async (inputRoomName) => {
    try {
      // eslint-disable-next-line camelcase
      const result = await user_rooms.findOne({
        where: { roomName: inputRoomName }
      })
      return result
    } catch (error) {
      return undefined
    }
  }

  createRooms = async (roomName, player1Id, player1Choice) => {
    try {
      // eslint-disable-next-line camelcase
      await user_rooms.create({ roomName, player1Id, player1Choice })
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = new RoomModel()
