import express from 'express';
import expressValidator from 'express-joi-validator';
import {create, login} from '../controller/User';
import {register, loggin} from '../controller/User/policies';

const router = express.Router();

router.post('/create', expressValidator(register), create);
router.post('/login', expressValidator(loggin), login);

export default router;
