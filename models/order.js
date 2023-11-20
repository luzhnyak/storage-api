// const mongoose = require("mongoose");
// const { handleMongooseError } = require("../helpers");
// const Schema = mongoose.Schema;
const Joi = require("joi");

// ========================== Joi schemas

const orderSchema = Joi.object({
  id: Joi.number(),
  date_added: Joi.date(),
  date_modified: Joi.date(),
  user_id: Joi.number(),
  contragent_id: Joi.number(),
  comment: Joi.string().required(),
});

const orderProductSchema = Joi.object({
  id: Joi.number(),
  order_id: Joi.number(),
  product_id: Joi.number(),
  quantity: Joi.number(),
  price: Joi.number(),
});

module.exports = { orderSchema, orderProductSchema };
