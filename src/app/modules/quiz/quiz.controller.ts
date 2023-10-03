import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICourse } from "../course/course.interface";
import service from "./quiz.service";
import { Request, Response } from "express";
import { IQuiz } from "./quiz.interface";

const createQuiz = catchAsync(async (req: Request, res: Response) => {
    const result = await service.createQuizService(
        req.params.courseId,
        req.params.sectionId,
        req.body
    );

    sendResponse<ICourse>(res, {
        statusCode: httpStatus.OK,
        message: "Successfully created",
        data: result,
        success: true,
    });
});

const addQuestion = catchAsync(async (req: Request, res: Response) => {
    const result = await service.addQuestionsService(
        req.params.courseId,
        req.params.sectionId,
        req.params.quizId,
        req.body
    );

    sendResponse<ICourse>(res, {
        statusCode: httpStatus.OK,
        message: "Successfully added question",
        data: result,
        success: true,
    });
});

const getSpecificQuiz = catchAsync(async (req: Request, res: Response) => {
    const result = await service.getSpecificQuizService(
        req.params.courseId,
        req.params.sectionId,
        req.params.quizId
    );

    sendResponse<IQuiz>(res, {
        statusCode: httpStatus.OK,
        message: "Successfully added question",
        data: result,
        success: true,
    });
});

export default { createQuiz, addQuestion, getSpecificQuiz };
