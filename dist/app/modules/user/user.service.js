"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("./user.model"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const student_model_1 = __importDefault(require("../student/student.model"));
const createStudentService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = "student";
    const session = yield mongoose_1.default.startSession();
    let newUserData = null;
    try {
        session.startTransaction();
        const newStudent = yield student_model_1.default.create([
            {
                courses: [],
                recommendCourses: [],
                dailyStreak: [],
            },
        ], { session });
        user.student = newStudent[0]._id;
        const newUser = yield user_model_1.default.create([user], { session });
        if (!newUser || newUser.length === 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user!");
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newUserData;
});
const myProfileService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId).select({ password: 0 });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    return user;
});
const updatedProfileService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(userId, userData);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    return user;
});
exports.default = {
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
