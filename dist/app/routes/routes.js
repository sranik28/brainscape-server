"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const course_route_1 = __importDefault(require("../modules/course/course.route"));
const student_route_1 = __importDefault(require("../modules/student/student.route"));
const router = express_1.default.Router();
const routes = [
    {
        path: "/auth",
        router: auth_route_1.default,
    },
    {
        path: "/user",
        router: user_route_1.default,
    },
    {
        path: "/course",
        router: course_route_1.default,
    },
    {
        path: "/student",
        router: student_route_1.default,
    },
];
routes.forEach(route => router.use(route.path, route.router));
exports.default = router;
