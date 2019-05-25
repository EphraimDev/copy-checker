// const express = require('express');
// const multer = require('multer');
// const compareCtrl = require('../controller');
import express from 'express';
import multer from 'multer';
import CompareCtrl from '../controller'
// const validateUser = require('../policies');
const { catchErrors, verifyToken, checkTokenExists } = require('../../../helpers');

// const storage = multer.diskStorage({
//     filename(_req, file, callback) {
//       callback(null, Date.now() + file.originalname);
//     },
//   });
//   const imageFilter = (_req, file, cb) => {
//     // accept image files in jpg/jpeg/png only
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     return cb(null, true);
//   };
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/compare-submission', upload.fields([
    {name: "firstStudent", maxCount: 1}, 
    {name: "secondStudent", maxCount:1}, 
    {name: "firstStudentID", maxCount: 1},
    {name: "secondStudentID", maxCount: 1},
    {name: "first", maxCount: 1},
    {name: "second", maxCount: 1},
    {name: "course", maxCount: 1},
    {name: "topic", maxCount: 1},
    {name: "date", maxCount: 1}
]), catchErrors(CompareCtrl.check));

module.exports = router;
