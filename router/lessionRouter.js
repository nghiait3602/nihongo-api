const express = require('express');
const baiHocController = require('./../controller/lessionController');
const authController = require('./../controller/authController');

const router = express.Router({mergeParams : true});

router.use(authController.protect);

router.route('/').get(baiHocController.getAllBaiHoc).post(authController.restrictTo('admin'),baiHocController.setKhoaHocId, baiHocController.createBaiHoc);

router.route('/:id').get(baiHocController.getBaiHoc).patch(authController.restrictTo('admin'), baiHocController.updateBaiHoc).delete(authController.restrictTo('admin'), baiHocController.deleteBaiHoc);

module.exports = router;