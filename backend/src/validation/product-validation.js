import Joi from 'joi';

const createProductValidation = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(500).required(),
  price: Joi.number().precision(2).positive().required(),
  stock_quantity: Joi.number().min(1).max(9999).required(),
  image_path: Joi.string().uri().required(),
  categories: Joi.array().items(Joi.string().required())
});

const searchProductValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().default(10),
  name: Joi.string().optional()
});

const productsByCategoryValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().default(10)
});

export {
  createProductValidation,
  searchProductValidation,
  productsByCategoryValidation
};