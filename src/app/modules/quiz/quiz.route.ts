import express from "express";
import controller from "./quiz.controller";

const router = express.Router();

router.post("/createQuiz/:courseId/:sectionId", controller.createQuiz);
router.post(
    "/addQuestion/:courseId/:sectionId/:quizId",
    controller.addQuestion
);
router.get("/:courseId/:sectionId/:quizId", controller.getSpecificQuiz);

export default router;
