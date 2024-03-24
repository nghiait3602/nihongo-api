const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const tienTrinhBaiHocRouter = require('./learningProgressRouter');
const router = express.Router();

router.post('/signup',userController.uploadUserPhoto, userController.uploadImage, authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/verification', authController.verify);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.updateImage,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);
router.use('/:userId/tientrinhbaihoc', tienTrinhBaiHocRouter);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.uploadUserPhoto, userController.uploadImage, userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.uploadUserPhoto, userController.updateImage, userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
