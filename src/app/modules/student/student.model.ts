import mongoose from "mongoose";
import { IStudent, StudentModel } from "./student.interface";

const StudentSchema = new mongoose.Schema<IStudent, StudentModel>(
    {
        courses: [
            {
                courseId: { type: String, required: true },
                progress: [String],
            },
        ],
        recommendCourses: [String],
        dailyStreak: [
            {
                day: String,
                date: Number,
                active: Boolean,
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false, // Turns off versionKey
    }
);

const Student = mongoose.model<IStudent, StudentModel>(
    "Student",
    StudentSchema
);

export default Student;
