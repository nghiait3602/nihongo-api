const express = require('express');
const upLoad = require('./../controller/upload');
const uploadCloud = require('../config/cloudinaryStorage.config');
const router = express.Router();

router.post('/', uploadCloud.single('image'), upLoad.upLoad);
module.exports = router;
