const authProtection = async (req, res, next) => {
  const tokenId = req.token.id.toString()
  const { userId } = await req.params
  if (isNaN(parseFloat(userId))) {
    return res.status(400).json({ message: 'params is not a number' })
  } else {
    if (tokenId === userId) {
      next()
    } else {
      return res.status(403).json({ message: 'Unauthorized' })
    }
  }
}

module.exports = authProtection
