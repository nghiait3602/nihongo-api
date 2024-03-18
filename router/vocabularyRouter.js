const express = require('express');
const tuVungController = require('./../controller/vocabularyController');
const authController = require('./../controller/authController');

const router = express.Router({mergeParams : true});

router.use(authController.protect);

router.route('/').get(tuVungController.getAllTuVung).post(authController.restrictTo('admin'),tuVungController.setBaiHocId ,tuVungController.createTuVung);
router.route('/:id').get(tuVungController.getTuVung).patch(authController.restrictTo('admin'), tuVungController.uploadHinhAnhTuVung, tuVungController.resizeHinhAnhTuVung, tuVungController.updateTuVung).delete(authController.restrictTo('admin'), tuVungController.deleteTuVung);

module.exports = router;