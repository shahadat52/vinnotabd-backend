import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { UserRoutes } from "../modules/user/user.route";
import { OrderRoutes } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/products',
        route: ProductRoutes,
    },
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/order',
        route: OrderRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router