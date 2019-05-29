import express from 'express';
import expressValidator from 'express-joi-validator';
import {create, login, profile, allusers, decodeToken} from '../controller/User';
import {register, loggin} from '../controller/User/policies';
import {auth, verifyToken} from '../middleware/check-auth';

const router = express.Router();

router.post('/create', expressValidator(register), create);
router.post('/login', expressValidator(loggin), login);
router.get('/user/:userId', profile);
router.get('/all', allusers);
router.get('/verify-token', verifyToken, decodeToken)
export default router;
