import mongoose from "mongoose";

export type ITeacher = {
    courseCreated: mongoose.Types.ObjectId[];
    _id: mongoose.Types.ObjectId;
};

export type TeacherModel = mongoose.Model<ITeacher, Record<string, unknown>>;
