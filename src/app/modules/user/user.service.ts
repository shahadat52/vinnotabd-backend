/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import AppError from "../../errors/appErrors";
import { UserModel } from "./user.model";
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const createUserInDB = async (userData: any) => {
    if (!await UserModel.find({ email: userData.email })) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
    };
    await UserModel.create(userData);
    return
};

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
    // const queryObj = { ...query };

    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query.searchTerm as string;
    }


    if (query.searchTerm) {
        const searchQuery = await UserModel.find({
            $or: ['name', 'phone', 'email'].map(
                (field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                }),
            ),
        });
        return searchQuery
    };

    const result = await UserModel.find()
    return result
};

const getSingleUserById = async (id: string) => {
    const result = await UserModel.findById(id);
    return result
};

const loginUser = async (payload: any) => {
    const user = await UserModel.findOne({ email: payload?.email }).select('+password');
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not available');
    }

    const status = user?.status;
    if (status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }
    if (user?.password !== payload.password) {
        throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
    }
    // const matchPassword = await bcrypt.compare(payload.password, user.password);
    // console.log(matchPassword);

    const jwtPayload = {
        id: user?._id,
        email: user?.email,
        name: user?.name,
        phone: user?.phone,
        role: user?.role,
    };
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '10d' },
    );

    // const refreshToken = createToken(
    //   jwtPayload,
    //   config.refresh_key as string,
    //   '365d',
    // );

    return {
        accessToken,

    };
}

export const userServices = {
    createUserInDB,
    getAllUsersFromDb,
    getSingleUserById,
    loginUser
}