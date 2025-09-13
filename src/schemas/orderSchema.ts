import Joi from "joi";

export const orderSchema = Joi.object({
  userId: Joi.number(),
  contragentId: Joi.number(),
  comment: Joi.string().required(),
});

export const orderItemSchema = Joi.object({
  orderId: Joi.number(),
  productId: Joi.number(),
  quantity: Joi.number(),
  price: Joi.number(),
});
