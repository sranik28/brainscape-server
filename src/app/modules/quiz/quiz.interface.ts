import mongoose from "mongoose";

export type IQuestion = {
    questionType: "Bullet Point" | "Explanation" | "Fill in the gap";
    bulletPoints?: string[];
    description: string;
    question: string;
    answer: string | number;
    index: number;
    explanation: string;
    _id: mongoose.Types.ObjectId;
};

export type IQuiz = {
    questions: IQuestion[];
    title: string;
    _id: mongoose.Types.ObjectId;
};

export type QuizModel = mongoose.Model<IQuiz, Record<string, unknown>>;
