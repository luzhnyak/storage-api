const Joi = require("joi");

// ========================== Joi schemas

const brandSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string(),
});

module.exports = { brandSchema };
