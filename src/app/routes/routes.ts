import express, { IRouter } from "express";
import authRouter from "../modules/auth/auth.route";
import userRouter from "../modules/user/user.route";
import courseRouter from "../modules/course/course.route";
import studentRouter from "../modules/student/student.route";
import quizRouter from "../modules/quiz/quiz.route";
import teacherRouter from "../modules/teacher/teacher.route";

type IRoute = {
    path: string;
    router: IRouter;
};

const router = express.Router();

const routes: IRoute[] = [
    {
        path: "/auth",
        router: authRouter,
    },
    {
        path: "/user",
        router: userRouter,
    },
    {
        path: "/course",
        router: courseRouter,
    },
    {
        path: "/student",
        router: studentRouter,
    },
    {
        path: "/quiz",
        router: quizRouter,
    },
    {
        path: "/teacher",
        router: teacherRouter,
    },
];

routes.forEach(route => router.use(route.path, route.router));

export default router;
