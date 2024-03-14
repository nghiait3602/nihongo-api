const express = require('express');
const khoaHocController = require('./../controller/courseController');

const router = express.Router();

router.route('/home').get(khoaHocController.getAllKhoaHoc).post(khoaHocController.createKhoaHoc);

router.route('/:id').get(khoaHocController.getKhoaHoc).patch(khoaHocController.uploadHinhAnhKhoaHoc,khoaHocController.resizeHinhAnhKhoaHoc ,khoaHocController.updateKhoahoc).delete(khoaHocController.deleteKhoahoc);

module.exports = router;