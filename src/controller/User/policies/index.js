import joi from 'joi';

export const register = {
  body: {
    email: joi.string().email().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    password: joi.string().regex(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/).required()
  },
};

export const loggin = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/).required()
  },
};

