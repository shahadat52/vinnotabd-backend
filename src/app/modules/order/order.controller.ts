import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status';

const placeOrder = catchAsync(async (req, res) => {

    const result = await orderServices.placeOrderInDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order placed successfully',
        data: result,
    });
});


const getAllOrders = catchAsync(async (req, res) => {

    const result = await orderServices.getAllOrdersFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders data retrieved successfully',
        data: result,
    });
});

export const orderControllers = {
    placeOrder,
    getAllOrders
}