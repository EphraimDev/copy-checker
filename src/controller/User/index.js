import bcrypt from 'bcryptjs';

import { User } from '../../model/User';

/**
   * Create a new user
   * @method create
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  export const create = async (req, res) => {
    const {
      name, email, password, 
    } = req.body;
  
    const user = new User();
    User.findOne({ email }).then((findUser) => {
      if (findUser) {
        return res.status(409).json({
          message: 'User exists already'
        })
      } 
  
        user.name = name;
        user.email = email;
        user.password = bcrypt.hashSync(password, 10);
        user.save();
        const token = user.generateJWT(user._id, name, email);
  
       return res.status(200).json({
         message: 'Successful',
         user
       })
      
    });
  };

/**
   * Log In User
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = new User();

  // Get User by Email
  const findUser = await User.findOne({ email });

  // Authenticate User
  if (findUser) {
    const verifyPassword = await bcrypt.compare(password, findUser.password);

    const token = user.generateJWT();

    if (verifyPassword) {
      return res.status(200).json({
        message: 'Successful',
        token
      })
    } else {
      // User password is wrong
      return res.status(409).json({
        message: 'User not authenticated'
      })
    }
  } else {
    // user Unauthorized
    return res.status(404).json({
      message: 'User not found'
    })
  }
};

