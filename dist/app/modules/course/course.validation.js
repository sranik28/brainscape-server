"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseValidation = void 0;
const zod_1 = require("zod");
exports.createCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["Private", "Public"], {
            required_error: "Status is required",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        image: zod_1.z
            .string({
            required_error: "Image is required",
        })
            .url({
            message: "Invalid URL",
        }),
        category: zod_1.z.string({ required_error: "Category is required" }),
        title: zod_1.z.string({ required_error: "title is required" }),
    }),
});
