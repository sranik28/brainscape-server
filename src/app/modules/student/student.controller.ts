import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import service from "./student.service";
import sendResponse from "../../../shared/sendResponse";
import { IStudent } from "./student.interface";
import httpStatus from "http-status";

const joinCourse = catchAsync(async (req: Request, res: Response) => {
    const courseJoin = await service.joinCourseService(
        req.params.id,
        req.params.courseId
    );

    sendResponse<IStudent>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Course joined",
        data: courseJoin,
    });
});
const leaveCourse = catchAsync(async (req: Request, res: Response) => {
    const courseLeave = await service.leaveCourseService(
        req.params.id,
        req.params.courseId
    );

    sendResponse<IStudent>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Course left",
        data: courseLeave,
    });
});

export default { joinCourse, leaveCourse };
