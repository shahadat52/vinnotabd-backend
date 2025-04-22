/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appErrors';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/user/user.model';
import { TUserRole } from '../interface/TUserRole';
const auth = (...requireRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'This user is unauthorized!! Please login and collect token',
      );
    }
    const decoded = jwt.verify(token, config.jwt_secret as string,) as JwtPayload;
    console.log(decoded);
    const { id } = decoded;

    //start\\

    const user = await UserModel.findOne({ id });
    if (!(await UserModel.findById(id))) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not available');
    }

    const status = user?.status;
    if (status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }


    //end\\

    jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorized');
      }
      const role = (decoded as any)?.role;
      if (requireRole && !requireRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorized cz you have no role');
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
