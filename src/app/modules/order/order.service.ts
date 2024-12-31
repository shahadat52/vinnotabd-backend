/* eslint-disable @typescript-eslint/no-explicit-any */
// import AppError from "../../errors/appErrors";
// import httpStatus from 'http-status';
import { OrderModel } from "./order.model";

const placeOrderInDB = async (orderData: any) => {

    const result = await OrderModel.create(orderData);
    return result
};

const getAllOrdersFromDB = async () => {

    const result = await OrderModel.find().populate('orderProducts');
    return result
};

export const orderServices = {
    placeOrderInDB,
    getAllOrdersFromDB
}