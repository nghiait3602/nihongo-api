const express = require('express');
const baiTapDocController = require('./../controller/readingController');
const authController = require('./../controller/authController');

const router = express.Router({mergeParams : true});

router.use(authController.protect);

router.route('/').get(baiTapDocController.getAllBaiTapDoc).post(authController.restrictTo('admin'),baiTapDocController.setBaiHocId, baiTapDocController.createBaiTapDoc);
router.route('/:id').get(baiTapDocController.getBaiTapDoc).patch(authController.restrictTo('admin'), baiTapDocController.updateBaiTapDoc).delete(authController.restrictTo('admin'), baiTapDocController.deleteBaiTapDoc);

module.exports = router;