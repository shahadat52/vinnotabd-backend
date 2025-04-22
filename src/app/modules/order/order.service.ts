/* eslint-disable @typescript-eslint/no-explicit-any */
// import AppError from "../../errors/appErrors";
// import httpStatus from 'http-status';
import { OrderModel } from "./order.model";

const placeOrderInDB = async (orderData: any) => {
    orderData.user = orderData.user || null; // Set user to null if not provided
    const result = await OrderModel.create(orderData);
    return result
};

const getAllOrdersFromDB = async () => {
    const result = await OrderModel.find();
    return result
};

const getSpecificUserOrdersFromDB = async (id: string) => {
    const result = await OrderModel.find({ phone: id });
    return result
};

export const orderServices = {
    placeOrderInDB,
    getAllOrdersFromDB,
    getSpecificUserOrdersFromDB
}