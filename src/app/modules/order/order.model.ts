import { model, Schema, Types } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: false,
        },
        guestInfo: {
            name: {
                type: String,
                trim: true,
                minlength: [2, 'Guest name must be at least 2 characters'],
                maxlength: [100, 'Guest name must not exceed 100 characters'],
                required: [function () { return !this.user }, 'Guest name is required when no user is provided'],
            },
            email: {
                type: String,
                trim: true,
                match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
                required: [function () { return !this.user }, 'Guest email is required when no user is provided'],
            },
            phone: {
                type: String,
                trim: true,
                match: [/^\d{10,15}$/, 'Please provide a valid phone number (10-15 digits)'],
                required: [function () { return !this.user }, 'Guest phone is required when no user is provided'],
            },
        },
        items: [
            {
                productId: {
                    type: Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Product ID is required for each item'],
                },
                name: {
                    type: String,
                    required: [true, 'Product name is required'],
                    trim: true,
                },
                price: {
                    type: Number,
                    required: [true, 'Product price is required'],
                    min: [0, 'Product price must be a positive number'],
                },
                quantity: {
                    type: Number,
                    required: [true, 'Product quantity is required'],
                    min: [1, 'Product quantity must be at least 1'],
                },
                image: {
                    type: String,
                    trim: true,
                },
            },
        ],
        status: {
            type: String,
            enum: {
                values: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
                message: 'Order status must be one of: pending, confirmed, shipped, delivered, cancelled',
            },
            default: 'pending',
        },
        shippingAddress: {
            name: {
                type: String,
                trim: true,
                minlength: [2, 'Shipping name must be at least 2 characters'],
                maxlength: [100, 'Shipping name must not exceed 100 characters'],
                required: [true, 'Shipping name is required'],
            },
            phone: {
                type: String,
                trim: true,
                match: [/^\d{10,15}$/, 'Please provide a valid shipping phone number (10-15 digits)'],
                required: [true, 'Shipping phone number is required'],
            },
            address: {
                type: String,
                trim: true,
                minlength: [5, 'Shipping address must be at least 5 characters'],
                maxlength: [500, 'Shipping address must not exceed 500 characters'],
                required: [true, 'Shipping address is required'],
            },
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required'],
            min: [0, 'Total amount must be a positive number'],
        },
    },
    { timestamps: true }
);

// Custom validation for either user or guestInfo
OrderSchema.pre('validate', function (next) {
    if (!this.user && (!this.guestInfo?.email || !this.guestInfo?.name || !this.guestInfo?.phone)) {
        return next(new Error('Guest name, email, and phone are required when user is not logged in.'));
    }
    next();
});

export const OrderModel = model('Order', OrderSchema);
