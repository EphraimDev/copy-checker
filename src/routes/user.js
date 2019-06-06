import express from 'express';
import {create, login, profile, allusers, decodeToken} from '../controller/User';
// import UserValidation from '../controller/User/policies';
// import {auth, verifyToken} from '../middleware/check-auth';

const router = express.Router();
 
router.post('/create', create);
router.post('/login', login);
router.get('/user/:userId', profile);
// router.get('/all', allusers);
// router.get('/verify-token', verifyToken, decodeToken)
export default router;
