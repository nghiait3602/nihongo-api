const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
router
  .get('/', userController.getAllUser)
  .post('/createUser', userController.createUser);
module.exports = router;
