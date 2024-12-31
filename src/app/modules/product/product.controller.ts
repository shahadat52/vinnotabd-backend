import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServices } from "./product.service";
import httpStatus from 'http-status';

//controller fn will call service fn

const createProducts = catchAsync(async (req, res) => {
    // const data = req.body;
    // console.log(data);

    const result = await productServices.createProductsInDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product added successfully',
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const query = req.query;

    const result = await productServices.getAllProductsFromDb(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products data retrieved successfully',
        data: result,
    });
});

const getSingleProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;

    const result = await productServices.getSingleProductById(productId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product data retrieved successfully',
        data: result,
    });
});

export const productControllers = {
    createProducts,
    getAllProducts,
    getSingleProduct
}