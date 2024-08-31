const Joi = require("joi");

const quoteSchema = Joi.object({
  text: Joi.string().min(3).max(250).required(),
  category: Joi.string().min(3).max(20).required(),
  authorId: Joi.number().integer().optional(), // Adjusted based on your controller
  name: Joi.string().min(3).max(250).optional(), // Adjusted based on your controller
  picture: Joi.string().uri().optional(), // Adjusted based on your controller
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(), // Ensure year is an integer
});

const authorSchema = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  picture: Joi.string().uri().optional(), // Ensure picture is a valid URL if provided
});

module.exports = {
  quoteSchema,
  authorSchema,
};
