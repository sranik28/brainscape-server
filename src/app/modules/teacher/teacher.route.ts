import express from "express";
import controller from "./teacher.controller";

const router = express.Router();

router.post("/create-teacher", controller.createTeacher);

export default router;
