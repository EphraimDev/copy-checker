const data = {
  create: {
    firstname: 'James',
    lastname: 'Andrew',
    email: 'abgf@yahoo.com',
    password: 'JamesAnd1@'
  },
  login: {
    email: 'admin@copy.co',
    password: 'Admin2019@',
  },
  forgotPassword: {
    email: 'abgf@yahoo.com',
  },
  resetPassword: {
    email: 'abgf@yahoo.com',
    password: 'JamesAnd1@',
  },
  noFirstName: {
    lastname: 'Andrew',
    email: 'abgf@yahoo.com',
    password: 'JamesAnd1@',
  },
  wrongEmailLoginFormat: {
    email: 'yahoo.com',
    password: 'JamesAnd1@',
  },
  wrongPasswordLoginFormat: {
    email: 'abgf@yahoo.com',
    password: 'JamesAnd',
  },
  noUser: {
    email: 'abf@yahoo.com',
    password: 'JamesAnd1@',
  },
  incorrectPassword: {
    email: 'abgf@yahoo.com',
    password: 'Jamesnd1@',
  },
  incorrectEmail: {
    email: 'james@gmail.com',
  },
  invalidEmail: {
    email: 'adgf'
  },
  incorrectResetEmail: {
    email: 'reset@gmail.com',
    password: 'James23@#',
    token: 'gshdgs'
  },
  noResetEmail: {
    password: 'James!@12',
    token: 'abchde'
  },
  noResetPassword: {
    email: 'reset@gmail.com',
    token: 'abdfer'
  },
  noToken: {
    email: 'reset@gmail.com',
    password: 'James23@#'
  },
  wrongToken: {
    email: 'abgf@yahoo.com',
    password: 'ResetWe12@',
    token: 'gsgdgdty'
  }
};

export default data;