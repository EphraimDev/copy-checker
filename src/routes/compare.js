import express from 'express';
import multer from 'multer';
import CompareSubmission from '../controller/Compare';
import {auth} from '../middleware/check-auth';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/compare-submission', auth, upload.fields([
    {name: 'first', maxCount: 1}, 
    {name: 'second', maxCount: 1}]), CompareSubmission.check);
router.get('/view-comparison/:compareId', auth, CompareSubmission.view);


export default router;
