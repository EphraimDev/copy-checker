import joi from 'joi';

export const register = {
  body: {
    email: joi.string().email().required(),
    name: joi.string().required(),
    password: joi.string().alphanum().min(8).max(30)
  },
};

export const loggin = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(3).max(30)
      .required(),
  },
};

