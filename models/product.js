const Joi = require("joi");

// ========================== Joi schemas

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  category_id: Joi.number().required(),
  price: Joi.string(),
  country: Joi.string(),
  image: Joi.string(),
});

module.exports = { productSchema };
