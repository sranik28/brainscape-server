import mongoose from "mongoose";
import { IUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import Student from "../student/student.model";

const createStudentService = async (user: IUser): Promise<IUser> => {
    user.role = "student";
    const session = await mongoose.startSession();
    let newUserData = null;
    try {
        session.startTransaction();
        const newStudent = await Student.create(
            [
                {
                    courses: [],
                    recommendCourses: [],
                    dailyStreak: [],
                },
            ],
            { session }
        );
        user.student = newStudent[0]._id;
        const newUser = await User.create([user], { session });

        if (!newUser || newUser.length === 0) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Failed to create user!"
            );
        }
        // You can exclude the password field here
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

const myProfileService = async (userId: string): Promise<IUser> => {
    const user = await User.findById(userId).select({ password: 0 });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }
    return user;
};

const updatedProfileService = async (
    userId: string,
    userData: Partial<IUser>
): Promise<IUser> => {
    const user = await User.findByIdAndUpdate(userId, userData);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }
    return user;
};

export default {
    createStudentService,
    myProfileService,
    updatedProfileService,
};

/*
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await User.findOneAndUpdate({ id }, updatedUserData, {
    new: true,
  });
  return result;
};
*/
