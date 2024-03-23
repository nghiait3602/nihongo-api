const express = require("express");
const khoaHocController = require("./../controller/courseController");
const baiHocRouter = require("./lessionRouter");
const authController = require("./../controller/authController");

const router = express.Router();

router.use(authController.protect);

router.use("/:khoaHocId/baihoc", baiHocRouter);

router
  .route("/")
  .get(khoaHocController.getAllKhoaHoc)
  .post(
    authController.restrictTo("admin"),
    khoaHocController.uploadHinhAnhKhoaHoc,
    khoaHocController.uploadImage,
    khoaHocController.createKhoaHoc
  );

router
  .route("/:id")
  .get(khoaHocController.getKhoaHoc)
  .patch(
    authController.restrictTo("admin"),
    khoaHocController.uploadHinhAnhKhoaHoc,
    khoaHocController.updateImage,
    khoaHocController.updateKhoahoc
  )
  .delete(authController.restrictTo("admin"), khoaHocController.deleteKhoahoc);

module.exports = router;
