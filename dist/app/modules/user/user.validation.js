"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: "First name is required" }),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string({ required_error: "Last name is required" }),
        }),
        email: zod_1.z.string({ required_error: "Email is required" }).email(),
        password: zod_1.z.string({ required_error: "Password is required" }),
        role: zod_1.z
            .enum(["student", "teacher", "admin"], {
            required_error: "Role is Required",
        })
            .default("student"),
        contact: zod_1.z.string().optional(),
        profilePicture: zod_1.z.string().optional(),
    }),
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        contact: zod_1.z.string().optional(),
        profilePicture: zod_1.z.string().optional(),
    }),
});
