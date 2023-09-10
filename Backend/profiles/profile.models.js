// eslint-disable-next-line camelcase
const { user_bios, user_games } = require('../db/models')

class ProfileModel {
  getUserBiodata = async (userUserId) => {
    try {
      // eslint-disable-next-line camelcase
      const data = await user_bios.findOne({
        attributes: [
          'fullname',
          'address',
          'phoneNumber',
          'dateOfBirth',
          'url'
        ],
        include: [
          {
            // eslint-disable-next-line camelcase
            model: user_games,
            as: 'user',
            attributes: [['id', 'userId'], 'username']
          }
        ],
        where: { userId: userUserId }
      })
      return data
    } catch (error) {
      return undefined
    }
  }

  findBioById = async (userId) => {
    try {
      // eslint-disable-next-line camelcase
      const data = await user_bios.findOne({ where: { userId } })
      return data
    } catch (error) {
      return undefined
    }
  }

  createBiodata = async (
    userFullname,
    userAddress,
    userPhoneNumber,
    userDateOfBirth,
    userUserId
  ) => {
    try {
      // eslint-disable-next-line camelcase
      await user_bios.create({
        fullname: userFullname,
        address: userAddress,
        phoneNumber: userPhoneNumber,
        dateOfBirth: userDateOfBirth,
        userId: userUserId
      })
      return true
    } catch (error) {
      return error
    }
  }

  updateBiodata = async (
    userFullname,
    userAddress,
    userPhoneNumber,
    userDateOfBirth,
    userUserId
  ) => {
    try {
      // eslint-disable-next-line camelcase
      await user_bios.update(
        { fullname: userFullname, address: userAddress, phoneNumber: userPhoneNumber, dateOfBirth: userDateOfBirth },
        { where: { userId: userUserId } }
      )
      return true
    } catch (error) {
      return error
    }
  }

  uploadURLPhoto = async (userUserId, urlPhoto) => {
    try {
      // eslint-disable-next-line camelcase, no-unused-vars
      const result = await user_bios.update({ url: urlPhoto }, { where: { userId: userUserId } })
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = new ProfileModel()
