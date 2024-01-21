import Joi from 'joi';

const createAddressValidation = Joi.object({
  title: Joi.string().max(100).required(),
  street: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  province: Joi.string().max(100).required(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.number().integer().positive().required().cast('string')
});

const getAddressValidation = Joi.number().min(1).positive().required();

const updateAddressValidation = Joi.object({
  title: Joi.string().max(100).optional(),
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),
  postal_code: Joi.number().integer().positive().optional().cast('string')
});

export {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation
};