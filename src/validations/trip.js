const Joi = require('joi');

const createTripSchema = Joi.object({
  title: Joi.string().min(3).required(),
  startDate: Joi.date().iso().required(),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').required()
});

module.exports = { createTripSchema };