const profileModel = require('./profile.models')
const { validationResult } = require('express-validator')
class ProfileController {
  getProfile = async (req, res) => {
    const { userId } = req.params

    const biodata = await profileModel.getUserBiodata(userId)
    if (biodata === null) {
      return res.status(404).json({ message: 'Biodata not found' })
    } else if (biodata === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    }
    return res.status(200).json({ message: biodata })
  }

  addProfile = async (req, res) => {
    const { userId } = req.params
    const { fullname, address, phoneNumber, dateOfBirth } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }

    const resultCheck = await profileModel.findBioById(userId)
    if (resultCheck === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    } else if (resultCheck === null) {
      const created = await profileModel.createBiodata(
        fullname,
        address,
        phoneNumber,
        dateOfBirth,
        userId
      )
      if (created === true) {
        return res.status(200).json({ message: 'Biodata successfully added' })
      }
      return res.status(500).json({ message: created })
    }

    const updated = await profileModel.updateBiodata(
      fullname,
      address,
      phoneNumber,
      dateOfBirth,
      userId
    )
    if (updated === true) {
      return res.status(200).json({ message: 'Biodata successfully added' })
    }
    return res.status(500).json({ message: updated })
  }

  uploadPhoto = async (req, res) => {
    const { userId } = req.params
    const { url } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }

    const uploaded = await profileModel.uploadURLPhoto(userId, url)
    if (uploaded === true) {
      return res.status(200).json({ message: 'Photo successfully uploaded' })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = new ProfileController()
