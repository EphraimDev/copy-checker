import jwt from 'jsonwebtoken';
import JsendSerializer from '../util/JsendSerializer';
import httpErrorCodes from '../util/httpErrorCodes';

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.owner = decoded.id;
        req.admin = decoded.isAdmin;
        return next();
    } catch (error) {
        return res.status(httpErrorCodes.UNAUTHORIZED).json(JsendSerializer.fail('Auth failed', error, 401));
    }
};

 // check if token is valid
const verifyToken = (req, res, next) =>{
  const { authorization } = req.headers;

  try {
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    
    if(decoded.exp < Date.now() / 1000){
      req.owner = decoded;
      return next();
    }else{
      return res.status(401).json({
        status: 401,
        method: req.method,
        message: 'Invalid token',
        data: null,
      });
    }
    //
  } catch (e) {
    return res.status(400).json({
      status: 400,
      method: req.method,
      message: 'Invalid token',
      data: null,
    });
  }
}

export {auth, verifyToken};
