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
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const course_service_1 = __importDefault(require("./course.service"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const course_constants_1 = require("./course.constants");
const getCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.default.getCourseService(req.params.id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "Successfully found course",
        statusCode: http_status_1.default.OK,
    });
}));
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.default.createCourseService(req.body);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "Successfully created course",
        statusCode: http_status_1.default.OK,
    });
}));
const addSection = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.courseId || !req.params.id) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Either CourseId or Title doesn't exist");
    }
    const result = yield course_service_1.default.addSectionService(req.params.courseId, req.params.title);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "Successfully added section",
        statusCode: http_status_1.default.OK,
    });
}));
const removeSection = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.courseId || !req.params.id) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Either CourseId or Title doesn't exist");
    }
    const result = yield course_service_1.default.removeSectionService(req.params.courseId, req.params.id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "Successfully removed section",
        statusCode: http_status_1.default.OK,
    });
}));
const getCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, course_constants_1.coursesFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield course_service_1.default.getCoursesService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Courses fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.default.updateCourseService(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully updated course",
        data: result,
    });
}));
exports.default = {
    createCourse,
    addSection,
    removeSection,
    getCourse,
    getCourses,
    updateCourse,
};
