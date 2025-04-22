import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

router.post(
    '/order-place',
    // auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
    orderControllers.placeOrder
);

router.get(
    '/',
    orderControllers.getAllOrders
);

router.get(
    '/:id',
    orderControllers.getSpecificUserOrders
);

export const OrderRoutes = router;