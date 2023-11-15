const Joi = require("joi");

// ========================== Joi schemas

const brandSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
});

module.exports = { brandSchema };
