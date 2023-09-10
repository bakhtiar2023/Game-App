'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomName: {
        type: Sequelize.STRING
      },
      player1Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_games',
          key: 'id'
        }
      },
      player1Choice: {
        type: Sequelize.STRING
      },
      player2Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_games',
          key: 'id'
        }
      },
      player2Choice: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_rooms')
  }
}
