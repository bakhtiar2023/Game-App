const { body } = require('express-validator')
class ProfileValidator {
  bioValidRules = () => {
    return [
      body('phoneNumber')
        .optional({ nullable: true })
        .isMobilePhone('id-ID')
        .withMessage('Invalid phone number'),
      body('dateOfBirth')
        .optional({ nullable: true })
        .isDate('dd-mm-yyyy')
        .withMessage('Invalid format, input use: dd-mm-yyyy')
    ]
  }

  photoValidRules = () => {
    return [
      body('url')
        .notEmpty()
        .withMessage("url shouldn't empty")
    ]
  }
}

module.exports = new ProfileValidator()
