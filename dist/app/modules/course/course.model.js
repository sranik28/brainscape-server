"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const quizSchema = new mongoose_1.default.Schema({
    quiz: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});
const courseSchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        required: true,
    },
    quizzes: {
        type: [
            {
                title: { type: String },
                quiz: [quizSchema],
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
}, { timestamps: true, versionKey: false });
const Course = mongoose_1.default.model("Course", courseSchema);
exports.default = Course;
