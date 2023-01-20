const Joi = require('joi')

const schema = Joi.object({
  topic: Joi.string().required(),
  option: Joi.array()
    .min(2)
    .max(5)
    .item(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
      }),
    )
    .unique()
    .require(),
})

module.exports = schema
