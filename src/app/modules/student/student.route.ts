import express from "express";
import studentController from "./student.controller";
const router = express.Router();

router.post("/join-course/:id/:courseId", studentController.joinCourse);
router.delete("/leave-course/:id/:courseId", studentController.leaveCourse);

export default router;
