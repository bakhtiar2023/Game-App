const { validationResult } = require('express-validator')
const historyModel = require('./histories.models')
const { generatePdf } = require('../generatePdf')
class HistoryController {
  getHistory = async (req, res) => {
    const { userId } = req.params
    const data = await historyModel.getHistory(userId)

    if (data.length < 1) {
      return res.status(404).json({ message: 'History of game not found' })
    } else if (data === undefined) {
      res.status(500).json({ message: 'Internal server error' })
    }

    return res.status(200).json({ message: data })
  }

  addHistory = async (req, res) => {
    const { userId } = req.params
    const { status } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }
    const created = await historyModel.createHistory(status, userId)
    if (created === true) {
      return res.status(200).json({ message: 'History successfully added' })
    }
    res.status(500).json({ message: 'Internal server error' })
  }

  getPdf = async (req, res) => {
    const { userId } = req.params
    const result = await generatePdf(userId)
    return res.json(result)
  }
}

module.exports = new HistoryController()
