const express = require('express');
const grammarController = require('./../controller/grammarController');
const authController = require('./../controller/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(grammarController.getAllGrammar)
  .post(
    authController.restrictTo('admin'),
    grammarController.setNguPhapId,
    grammarController.createGrammar
  );

router
  .route('/:id')
  .get(grammarController.getGrammar)
  .patch(authController.restrictTo('admin'), grammarController.updateGrammar)
  .delete(authController.restrictTo('admin'), grammarController.deleteGrammar);

router.route('/addDSNguPhap/:id').patch(grammarController.addDSNguPhap);

module.exports = router;
