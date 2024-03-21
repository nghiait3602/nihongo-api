const express = require('express');
const authController = require('./../controller/authController');
const capDoController = require('./../controller/levelController');
const router = express.Router({mergeParams : true});

router.use(authController.protect);

router.route('/').get(capDoController.getAllCapDo).post(authController.restrictTo('admin'),capDoController.setKhoaHocId, capDoController.creatCapDo);

module.exports = router;