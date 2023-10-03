"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const student_model_1 = __importDefault(require("./student.model"));
const course_model_1 = __importDefault(require("../course/course.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const joinCourseService = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const course = yield course_model_1.default.findById(courseId);
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    const obj = { courseId: courseId, progress: [] };
    const result = yield student_model_1.default.findByIdAndUpdate(user.student, {
        $push: {
            courses: obj,
        },
    }, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Failed to join course");
    }
    return result;
});
const leaveCourseService = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const course = yield course_model_1.default.findById(courseId);
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    const obj = { courseId: courseId };
    const result = yield student_model_1.default.findByIdAndUpdate(user.student, {
        $pull: {
            courses: obj,
        },
    }, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Failed to join course");
    }
    return result;
});
exports.default = { joinCourseService, leaveCourseService };
