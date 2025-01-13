import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
        unique: true,
    },
    status: {
        type: String,
        default: 'in-progress',
        enum: ['in-progress', 'blocked'],
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'superAdmin'],
        default: 'customer',
    }
}, { timestamps: true }
);

export const UserModel = model<TUser>('User', UserSchema);