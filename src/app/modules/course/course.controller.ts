import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import service from "./course.service";
import sendResponse from "../../../shared/sendResponse";
import { ICourse } from "./course.interface";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { coursesFilterableFields } from "./course.constants";

const getCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await service.getCourseService(req.params.id);
    sendResponse<ICourse>(res, {
        data: result,
        success: true,
        message: "Successfully found course",
        statusCode: httpStatus.OK,
    });
});

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await service.createCourseService(req.body);
    sendResponse<ICourse>(res, {
        data: result,
        success: true,
        message: "Successfully created course",
        statusCode: httpStatus.OK,
    });
});

const addSection = catchAsync(async (req: Request, res: Response) => {
    if (!req.params.courseId || !req.params.title) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "Either CourseId or Title doesn't exist"
        );
    }

    const result = await service.addSectionService(
        req.params.courseId,
        req.params.title
    );

    sendResponse<ICourse>(res, {
        data: result,
        success: true,
        message: "Successfully added section",
        statusCode: httpStatus.OK,
    });
});

const removeSection = catchAsync(async (req: Request, res: Response) => {
    if (!req.params.courseId || !req.params.id) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "Either CourseId or Title doesn't exist"
        );
    }

    const result = await service.removeSectionService(
        req.params.courseId,
        req.params.id
    );

    sendResponse<ICourse>(res, {
        data: result,
        success: true,
        message: "Successfully removed section",
        statusCode: httpStatus.OK,
    });
});

const getCourses = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, coursesFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await service.getCoursesService(filters, paginationOptions);

    sendResponse<ICourse[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await service.updateCourseService(req.params.id, req.body);

    sendResponse<ICourse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully updated course",
        data: result,
    });
});

export default {
    createCourse,
    addSection,
    removeSection,
    getCourse,
    getCourses,
    updateCourse,
};
