// import joi from 'joi';

// export const register = {
//   body: {
//     email: joi.string().email().required().label('Valid email is required'),
//     firstname: joi.string().required().label('First name is required'),
//     lastname: joi.string().required().label('Last name is required'),
//     password: joi.string().regex(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/).required().label('Valid password is required'),
//     isAdmin: joi.bool().default(false)
//   },
// };

// export const loggin = {
//   body: {
//     email: joi.string().email().required(),
//     password: joi.string().regex(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/).required()
//   },
// };

/**
 * @exports
 * @class UserValidation
 */
class UserValidation {
  /**
      * Validate sign up input
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validateSignUp(req, res, next) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const regex = /^[a-zA-Z- ]+( [a-zA-Z- ]+)*$/i;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
      firstname,
      lastname,
      email,
      password,
    } = req.body;
    if (typeof firstname !== 'string' || firstname.length < 1 || regex.test(firstname) === false) {
      res.status(400).json({ message: 'First name should only contain letters' });
    }
    if (typeof lastname !== 'string' || lastname.length < 1 || regex.test(lastname) === false) {
      res.status(400).json({ message: 'Last name should only contain letters' });
    }
    if (typeof email !== 'string' || email.toString().trim() === '' || emailRegex.test(email) === false) {
      res.status(400).send({ message: 'Check the email' });
    }
    if (typeof password !== 'string' || password.toString().trim() === '' || passwordRegex.test(password) === false) {
      res.status(400).send({ message: 'Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
    }
    next();
  }

  /**
      * Validate login input
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validateLogin(req, res, next) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
      email,
      password,
    } = req.body;

    if (typeof email !== 'string' || email.toString().trim() === '' || emailRegex.test(email) === false) {
      res.status(400).send({ message: 'Check the email' });
    } else if (typeof password !== 'string' || password.toString().trim() === '' || passwordRegex.test(password) === false) {
      res.status(400).send({ message: 'Password must contin minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
    } else {
      next()
    }
  }

}

export default UserValidation;

