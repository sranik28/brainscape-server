import mongoose from "mongoose";

export type IStudent = {
    courses: Array<{
        courseId: string;
        progress: Array<string>;
    }>;
    recommendCourses: Array<string>;
    dailyStreak: Array<{
        day: string;
        date: number;
        active: boolean;
    }>;
    _id: mongoose.Types.ObjectId;
};

export type StudentModel = mongoose.Model<IStudent, Record<string, unknown>>;
