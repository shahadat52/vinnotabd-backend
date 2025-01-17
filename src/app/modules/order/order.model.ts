import { model, Schema, Types } from "mongoose";
import { TOrder } from "./order.interface";


const ShippingAddressSchema = new Schema({
    district: {
        type: String,
        required: [true, 'District is required']
    },
    subDistrict: {
        type: String,
        required: [true, 'SubDistrict is required']
    },
    union: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    }
});

const OrderSchema = new Schema<TOrder>({
    orderId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    customerName: {
        type: String,
        required: [true, 'Customer Name is required'],
        trim: true
    },
    orderProducts: [{
        type: Types.ObjectId,
        ref: "Product",
        required: [true, 'Product id is required']
    }],
    image: {
        type: String,
        required: [true, 'Selected Product Image is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Order Date is required']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'delivered'],
        default: 'pending',
        required: [true, 'Status is required']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total Amount is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    shippingAddress: {
        type: ShippingAddressSchema,
        required: [true, 'Shipping Address is required']
    }
});

export const OrderModel = model('Order', OrderSchema);


