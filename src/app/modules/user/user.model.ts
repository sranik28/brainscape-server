import mongoose from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new mongoose.Schema<IUser, UserModel>(
    {
        name: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: false,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "student",
            enum: ["student", "teacher", "admin"],
        },
        contact: {
            type: String,
            required: false,
        },
        profilePicture: {
            type: String,
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student",
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teacher",
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
        },
    },
    { timestamps: true, versionKey: false }
);

userSchema.statics.isUserExist = async function (
    email: string
): Promise<IUser | null> {
    return await User.findOne({ email: email });
};

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (user.password) {
        user.password = await bcrypt.hash(
            user.password,
            Number(config.bcrypt_salt_rounds)
        );
    }

    next();
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
