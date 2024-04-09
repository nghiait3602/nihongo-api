const express = require('express');
const kanjiController = require('./../controller/kanjiController');
const authController = require('./../controller/authController');

const router = express.Router({mergeParams : true});

router.use(authController.protect);

router.route('/addDSKanji/:id').patch(kanjiController.addDSKanji);

router.route('/').get(kanjiController.getAllKanji)
.post(authController.restrictTo('admin'),
kanjiController.uploadHinhAnhKanji,
kanjiController.uploadImage,
kanjiController.setBaiHocId, 
kanjiController.createKanji);
router.route('/:id')
.get(kanjiController.getKanji)
.patch(authController.restrictTo('admin')
,kanjiController.uploadHinhAnhKanji,
kanjiController.updateImage,
kanjiController.updateKanji)
.delete(authController.restrictTo('admin'), kanjiController.deleteKanji);

module.exports = router;