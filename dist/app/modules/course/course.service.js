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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const course_model_1 = __importDefault(require("./course.model"));
const paginationHelpers_1 = __importDefault(require("../../../helpers/paginationHelpers"));
const course_constants_1 = require("./course.constants");
const createCourseService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.create(payload);
    return result;
});
const addSectionService = (courseId, title) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield course_model_1.default.findById(courseId);
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course doesn't exist");
    }
    const result = (yield course_model_1.default.findByIdAndUpdate(courseId, {
        $push: {
            quizzes: {
                title,
                quiz: [],
            },
        },
    }, { new: true }));
    return result;
});
const removeSectionService = (courseId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield course_model_1.default.findById(courseId);
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course doesn't exist");
    }
    const result = (yield course_model_1.default.findByIdAndUpdate(courseId, {
        $pull: {
            quizzes: {
                id: id,
            },
        },
    }, { new: true }));
    return result;
});
const getCourseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course doesn't exist");
    }
    return result;
});
const getCoursesService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.default)(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: course_constants_1.coursesSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    andConditions.push({
        status: "Public",
    });
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield course_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield course_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateCourseService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield course_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
    }
    const result = yield course_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        return null;
    }
    return result.toObject();
});
exports.default = {
    createCourseService,
    addSectionService,
    removeSectionService,
    getCourseService,
    getCoursesService,
    updateCourseService,
};
