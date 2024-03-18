const express = require("express");
const quizzeController = require("./../controller/quizzeController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(quizzeController.getAllQuizze)
  .post(
    authController.restrictTo("admin"),
    quizzeController.setCauHoiId,
    quizzeController.createQuizze
  );

router
  .route("/:id")
  .get(quizzeController.getQuizze)
  .patch(authController.restrictTo("admin"), quizzeController.updateQuizze)
  .delete(authController.restrictTo("admin"), quizzeController.deleteQuizze);

module.exports = router;
