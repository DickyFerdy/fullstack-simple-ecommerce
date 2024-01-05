import Joi from "joi";

const registerUserValidation = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  username: Joi.string().min(4).max(255).required(),
  email: Joi.string().max(255).email().required(),
  password: Joi.string().min(4).max(255).required()
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(255).required(),
  password: Joi.string().max(255).required()
});

const getUserValidation = Joi.string().max(255).required();

const updateUserValidation = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  name: Joi.string().min(2).max(255).optional(),
  email: Joi.string().max(255).email().optional(),
  password: Joi.string().min(4).max(255).optional()
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
}