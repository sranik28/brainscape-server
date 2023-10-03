import mongoose from "mongoose";
import { ITeacher, TeacherModel } from "./teacher.interface";

const teacherSchema = new mongoose.Schema<ITeacher, TeacherModel>(
    {
        courseCreated: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course",
                },
            ],
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const Teacher = mongoose.model<ITeacher, TeacherModel>(
    "Teacher",
    teacherSchema
);

export default Teacher;
