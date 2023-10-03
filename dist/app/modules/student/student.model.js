"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StudentSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
    versionKey: false, // Turns off versionKey
});
const Student = mongoose_1.default.model("Student", StudentSchema);
exports.default = Student;
