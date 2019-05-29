import joi from 'joi';

export const register = {
  body: {
    email: joi.string().email().required().label('Valid email is required'),
    firstname: joi.string().required().label('First name is required'),
    lastname: joi.string().required().label('Last name is required'),
    password: joi.string().regex(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/).required().label('Valid password is required'),
    isAdmin: joi.bool().default(false)
  },
};

export const loggin = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/).required()
  },
};

