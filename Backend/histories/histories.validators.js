const { body } = require('express-validator')

class HistoryValidator {
  historyValidRules = () => {
    return [
      body('status')
        .notEmpty()
        .withMessage('Please enter game status')
        .isIn(['win', 'draw', 'lose'])
        .withMessage('Status contain : win|draw|lose')
    ]
  }
}

module.exports = new HistoryValidator()
