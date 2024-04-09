const express = require('express');
const tuVungController = require('./../controller/vocabularyController');
const authController = require('./../controller/authController');

const router = express.Router({mergeParams : true});

router.use(authController.protect);

router.route('/chude').get(tuVungController.selectTuVungTheoChuDe);
router.route('/')
.get(tuVungController.getAllTuVung)
.post(authController.restrictTo('admin'),
tuVungController.uploadHinhAnhTuVung,
tuVungController.uploadImage,
tuVungController.setBaiHocId,
tuVungController.createTuVung);
router.route('/:id')
.get(tuVungController.addDSTuVung, tuVungController.getTuVung)
.patch(authController.restrictTo('admin'), 
tuVungController.uploadHinhAnhTuVung, 
tuVungController.updateImage, 
tuVungController.updateTuVung)
.delete(authController.restrictTo('admin'), tuVungController.deleteTuVung);

module.exports = router;