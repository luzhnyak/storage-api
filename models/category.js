// const mongoose = require("mongoose");
// const { handleMongooseError } = require("../helpers");
// const Schema = mongoose.Schema;
const Joi = require("joi");

// ========================== Joi schemas

const categorySchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
});

module.exports = { categorySchema };
