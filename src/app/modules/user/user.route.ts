import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
    '/create-users',
    userControllers.createUsers
);

router.get(
    '/',
    userControllers.getAllUsers
);

router.get(
    '/login',
    userControllers.loginUser
);

export const UserRoutes = router;