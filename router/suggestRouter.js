const express = require('express');
const suggest = require('../controller/suggetsController');

const authController = require('../controller/authController');

const router = express.Router();
router.use(authController.protect);
router.post('/suggest', suggest.ChudeGoiY);
module.exports = router;
