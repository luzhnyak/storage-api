import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().positive().required(),
  image: Joi.string().uri().optional(),
  brandId: Joi.number().integer().optional(),
  categoryId: Joi.number().integer().optional(),
});
