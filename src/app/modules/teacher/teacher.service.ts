import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import Teacher from "./teacher.model";
import User from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createTeacherService = async (user: IUser): Promise<IUser> => {
    user.role = "teacher";
    const session = await mongoose.startSession();
    let newUserData = null;
    try {
        session.startTransaction();
        const newTeacher = await Teacher.create(
            [
                {
                    courseCreated: [],
                },
            ],
            { session }
        );
        user.teacher = newTeacher[0]._id;
        const newUser = await User.create([user], { session });

        if (!newUser || newUser.length === 0) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Failed to create user!"
            );
        }
        newUserData = newUser[0].toObject();
        delete newUserData.password;

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
    return newUserData;
};

export default { createTeacherService };
