const express = require('express');
const baiHocController = require('./../controller/lessionController');
const authController = require('./../controller/authController');
const kanjiRouter = require('./kanjiRouter');
const quizzeRouter = require('./quizzeRouter');
const tuVungRouter = require('./vocabularyRouter');
const nguPhapRouter = require('./grammarRouter');
const baiTapDocRouter = require('./readingRouter');
const tienTrinhBaiHocRouter = require('./learningProgressRouter');
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.use('/:baiHocId/kanji', kanjiRouter);
router.use('/:baiHocId/tuvung', tuVungRouter);
router.use('/:baiHocId/cauhoi', quizzeRouter);
router.use('/:baiHocId/nguphap', nguPhapRouter);
router.use('/:baiHocId/baitapdoc', baiTapDocRouter);
router.use('/:baiHocId/tientrinhbaihoc', tienTrinhBaiHocRouter);

router
  .route('/')
  .get(baiHocController.getAllBaiHoc)
  .post(
    authController.restrictTo('admin'),
    baiHocController.uploadHinhAnhBaiHoc,
    baiHocController.uploadImage,
    baiHocController.setKhoaHocId,
    baiHocController.createBaiHoc
  );

router
  .route('/:id')
  .get(baiHocController.getBaiHoc)
  .patch(authController.restrictTo('admin'),
  baiHocController.uploadHinhAnhBaiHoc,baiHocController.updateImage, 
  baiHocController.updateBaiHoc)
  .delete(authController.restrictTo('admin'), baiHocController.deleteBaiHoc);

module.exports = router;
