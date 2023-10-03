import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import service from "./teacher.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";

const createTeacher = catchAsync(async (req: Request, res: Response) => {
    const result = await service.createTeacherService(req.body);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully created teacher",
        data: result,
    });
});

export default { createTeacher };
