import { ENUM_USER_ROLE } from "../../../enums/user";
import { IUser } from "../user/user.interface";

export type ILoginUser = {
    email: string;
    password: string;
};

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
    user: Partial<IUser>;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};

export type IVerifiedLoginUser = {
    userId: string;
    role: ENUM_USER_ROLE;
};

export type IChangePassword = {
    oldPassword: string;
    newPassword: string;
};
