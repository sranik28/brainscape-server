import mongoose from "mongoose";
import { CourseModel, ICourse } from "./course.interface";

const courseSchema = new mongoose.Schema<ICourse, CourseModel>(
    {
        category: {
            type: String,
            required: true,
        },
        sections: {
            type: [
                {
                    section: {
                        type: String,
                        required: true,
                    },
                    quiz: [
                        {
                            questions: {
                                type: [
                                    {
                                        questionType: {
                                            type: String,
                                            required: true,
                                            enum: [
                                                "Bullet Points",
                                                "Explanation",
                                                "Fill in the gap",
                                            ],
                                        },
                                        bulletPoints: [
                                            {
                                                type: String,
                                                required: false,
                                            },
                                        ],
                                        description: {
                                            type: String,
                                            required: true,
                                            minlength: 150,
                                            maxlength: 1220,
                                        },
                                        question: {
                                            type: String,
                                            required: true,
                                        },
                                        answer: {
                                            type: String,
                                            required: true,
                                        },
                                        index: {
                                            type: Number,
                                            required: true,
                                        },
                                    },
                                ],
                            },
                            title: {
                                type: String,
                                required: true,
                            },
                        },
                    ],
                },
            ],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Public", "Private"],
        },
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const Course = mongoose.model<ICourse, CourseModel>("Course", courseSchema);

export default Course;
