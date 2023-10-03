import { z } from "zod";

export const createUserValidationSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({ required_error: "First name is required" }),
            middleName: z.string().optional(),
            lastName: z.string({ required_error: "Last name is required" }),
        }),
        email: z.string({ required_error: "Email is required" }).email(),
        password: z.string({ required_error: "Password is required" }),
        role: z
            .enum(["student", "teacher", "admin"], {
                required_error: "Role is Required",
            })
            .default("student"),
        contact: z.string().optional(),
        profilePicture: z.string().optional(),
    }),
});

export const updateUserValidationSchema = z.object({
    body: z.object({
        name: z
            .object({
                firstName: z.string().optional(),
                middleName: z.string().optional(),
                lastName: z.string().optional(),
            })
            .optional(),
        contact: z.string().optional(),
        profilePicture: z.string().optional(),
    }),
});
