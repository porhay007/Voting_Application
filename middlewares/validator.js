const ValidatorBody = schema => {
  const Validator = (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }
    next()
  }
  return Validator
}

module.exports = Validator
