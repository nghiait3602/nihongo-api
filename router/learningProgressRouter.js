const express = require('express');
const tienTrinhBaiHocController = require('./../controller/learningProgressController');
const authController = require('./../controller/authController');

const router = express.Router({mergeParams : true});

router.use(authController.protect);

router.route('/').get(tienTrinhBaiHocController.getAllTienTrinhBaiHoc).post(authController.restrictTo('admin'),tienTrinhBaiHocController.setBaiHocUserIds, tienTrinhBaiHocController.createTienTrinhBaiHoc);
router.route('/:id').get(tienTrinhBaiHocController.getTienTrinhBaiHoc).patch(authController.restrictTo('admin'), tienTrinhBaiHocController.updateTienTrinhBaiHoc).delete(authController.restrictTo('admin'), tienTrinhBaiHocController.deleteTienTrinhBaiHoc);

module.exports = router;