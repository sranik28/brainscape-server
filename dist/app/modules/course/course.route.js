"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = __importDefault(require("./course.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.get("/", course_controller_1.default.getCourses);
router.get("/:id", course_controller_1.default.getCourse);
router.patch("/:id", course_controller_1.default.updateCourse);
router.post("/create-course", (0, validateRequest_1.default)(course_validation_1.createCourseValidation), course_controller_1.default.createCourse);
router.post("/add-section/:courseId/:id", course_controller_1.default.addSection);
router.delete("/remove-section/:courseId/:id", course_controller_1.default.removeSection);
exports.default = router;
