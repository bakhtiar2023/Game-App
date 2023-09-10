const paramsChecker = async (req, res, next) => {
  const { roomId } = await req.params
  if (isNaN(parseFloat(roomId))) {
    return res.status(400).json({ message: 'params not a number' })
  } else {
    next()
  }
}

module.exports = paramsChecker
