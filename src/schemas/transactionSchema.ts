import Joi from "joi";

export const transactionSchema = Joi.object({
  userId: Joi.number(),
  customerId: Joi.number(),
  comment: Joi.string().required(),
});

export const transactionItemSchema = Joi.object({
  transactionId: Joi.number(),
  productId: Joi.number(),
  quantity: Joi.number(),
  price: Joi.number(),
});
