import httpStatus from "http-status";
import { ICourse } from "../course/course.interface";
import { IQuestion, IQuiz } from "./quiz.interface";
import ApiError from "../../../errors/ApiError";
import mongoose from "mongoose";
import Course from "../course/course.model";

const createQuizService = async (
    courseId: string,
    sectionId: string,
    data: IQuiz
): Promise<ICourse> => {
    const result = await Course.findOneAndUpdate(
        {
            _id: courseId,
            "sections._id": sectionId,
        },
        {
            $push: {
                "sections.$.quiz": data,
            },
        },
        {
            new: true,
        }
    );

    if (!result) {
        throw new ApiError(
            httpStatus.EXPECTATION_FAILED,
            "Failed to create quiz"
        );
    }

    return result;
};

const addQuestionsService = async (
    courseId: string,
    sectionId: string,
    quizId: string,
    data: IQuestion
): Promise<ICourse> => {
    const course = await Course.findById(courseId);
    if (!course || !course.sections) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to find course");
    }

    const section = course.sections.find(
        section => section._id.toString() === sectionId
    );
    let newIndex = 0;

    if (section) {
        const quiz = section.quiz.find(quiz => quiz._id.toString() === quizId);

        if (quiz) {
            newIndex = quiz.questions.length;
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Failed to find quiz");
        }
    } else {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to find section");
    }

    const newQuestion: IQuestion = {
        ...data,
        index: newIndex,
    };

    const result = await Course.findOneAndUpdate(
        {
            _id: courseId,
            "sections._id": sectionId,
            "sections.quiz._id": quizId,
        },
        {
            $push: {
                "sections.$[section].quiz.$[quiz].questions": newQuestion,
            },
        },
        {
            new: true,
            arrayFilters: [
                {
                    "section._id": new mongoose.Types.ObjectId(sectionId),
                },
                {
                    "quiz._id": new mongoose.Types.ObjectId(quizId),
                },
            ],
        }
    );

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create question");
    }

    return result;
};

const getSpecificQuizService = async (
    courseId: string,
    sectionId: string,
    quizId: string
): Promise<IQuiz> => {
    const course = await Course.findOne({
        _id: courseId,
        "sections._id": sectionId,
        "sections.quiz._id": quizId,
    });
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to find course");
    }

    let result;

    if (course && course.sections) {
        const section = course.sections.find(
            section => section._id.toString() === sectionId
        );

        if (section && section.quiz) {
            result = section.quiz.find(quiz => quiz._id.toString() === quizId);
        }
    }

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Quiz not Found");
    }

    return result;
};

export default {
    createQuizService,
    addQuestionsService,
    getSpecificQuizService,
};
