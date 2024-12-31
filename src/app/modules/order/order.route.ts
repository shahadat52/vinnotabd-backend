import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

router.post(
    '/order-place',
    orderControllers.placeOrder
);

router.get(
    '/',
    orderControllers.getAllOrders
);

router.get(
    '/:orderId',
    // userControllers.getSingleProduct
);

export const OrderRoutes = router;