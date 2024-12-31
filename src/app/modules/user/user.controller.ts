import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { userServices } from "./user.service";

//controller fn will call service fn

const createUsers = catchAsync(async (req, res) => {
    // const data = req.body;
    // console.log(data);

    const result = await userServices.createUserInDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const query = req.query;

    const result = await userServices.getAllUsersFromDb(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User data retrieved successfully',
        data: result,
    });
});

const loginUser = catchAsync(async (req, res) => {

    const result = await userServices.loginUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successfully',
        data: result,
    });
});

export const userControllers = {
    createUsers,
    getAllUsers,
    loginUser
}