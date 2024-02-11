const Joi = require("joi");

// ========================== Joi schemas

const orderSchema = Joi.object({
  date_added: Joi.date(),
  date_modified: Joi.date(),
  user_id: Joi.number(),
  contragent_id: Joi.number(),
  comment: Joi.string().required(),
});

const orderProductSchema = Joi.object({
  order_id: Joi.number(),
  product_id: Joi.number(),
  quantity: Joi.number(),
  price: Joi.number(),
});

module.exports = { orderSchema, orderProductSchema };
