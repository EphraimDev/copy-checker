import bcrypt from 'bcryptjs';

import { User } from '../../model/User';
import Compare from '../../model/CompareResult';
import { Submission } from '../../model/Submission';

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
      firstname, lastname, email, password, 
    } = req.body;
  
    const user = new User();
    User.findOne({ email }).then((findUser) => {
      if (findUser) {
        return res.status(409).json({
          message: 'User exists already'
        })
      } 
  
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = bcrypt.hashSync(password, 10);
        user.save();
        const token = user.generateJWT(user._id, email);
  
       return res.status(200).json({
         message: 'Successful',
         user,
         token
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

    const token = user.generateJWT(findUser._id, email);

    if (verifyPassword) {
      return res.status(200).json({
        message: 'Successful',
        token,
        findUser
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

export const profile = async (req, res) => {
  const {userId} = req.params;

  const user = await User.findById(userId);

  if(!user)
    return res.status(404).json({
      message: 'User does not exist'
    })

  const compareHistory = await Compare.find({createdBy: userId});

  const submitHistory = await Submission.find({createdBy: userId});

  return res.status(200).json({
    user,
    compareHistory,
    submitHistory,
    message: 'Successful'
  })
}

export const allusers = async(req, res) =>{
  const all = await User.find({});

  return res.json(all)
}

export const decodeToken = async(req, res) => {

  return res.status(200).json({
    user: req.owner,
    message: 'Successful'
  })
}

