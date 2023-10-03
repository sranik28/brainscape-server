import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import {
    ILoginUser,
    ILoginUserResponse,
    IRefreshTokenResponse,
} from "./auth.interface";
import User from "../user/user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { email, password } = payload;

    const user = await User.isUserExist(email);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    if (
        user.password &&
        !(await User.isPasswordMatched(password, user.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }

    const { role } = user;
    const accessToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    delete user.password;
    return {
        accessToken,
        refreshToken,
        user,
    };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(
            token,
            config.jwt.refresh_secret as Secret
        );
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
    }

    const { email, role } = verifiedToken;

    const isUserExist = await User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    const newAccessToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken,
    };
};

export default {
    loginUser,
    refreshToken,
};
