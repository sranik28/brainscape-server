import { z } from "zod";

export const createCourseValidation = z.object({
    body: z.object({
        status: z.enum(["Private", "Public"], {
            required_error: "Status is required",
        }),
        description: z.string({
            required_error: "Description is required",
        }),
        image: z
            .string({
                required_error: "Image is required",
            })
            .url({
                message: "Invalid URL",
            }),
        category: z.string({ required_error: "Category is required" }),
        title: z.string({ required_error: "title is required" }),
    }),
});
