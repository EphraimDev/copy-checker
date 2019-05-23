const express = require('express');
const userRoutes = require('../modules/User/routes');
const compareRoutes = require('../modules/Compare/routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/compare', compareRoutes);

module.exports = router;
