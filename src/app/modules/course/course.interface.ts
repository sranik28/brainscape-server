import mongoose from "mongoose";
import { IQuiz } from "../quiz/quiz.interface";

export type ICourse = {
    category: string;
    sections: {
        section: string;
        quiz: IQuiz[];
        _id: mongoose.Types.ObjectId;
    }[];
    description: string;
    image: string;
    status: "Public" | "Private";
    title: string;
    _id: mongoose.Types.ObjectId;
};

export type CourseModel = mongoose.Model<ICourse, Record<string, unknown>>;

export type ICourseFilters = {
    searchTerm?: string;
};
