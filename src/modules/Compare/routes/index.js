const express = require('express');
const multer = require('multer');
const compareCtrl = require('../controller');
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

router.post('/compare-submission', upload.any(), catchErrors(compareCtrl.check));

module.exports = router;
