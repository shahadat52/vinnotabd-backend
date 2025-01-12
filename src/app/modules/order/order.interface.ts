import { ObjectId } from "mongoose";

export type TShippingAddress = {

    district: string;
    subDistrict: string;
    union: string
    address: string;
}

export type TOrder = {
    orderId: string;
    customerName: string;
    quantity: number;
    orderProducts: ObjectId[];
    image: string;
    orderDate: Date;
    status: 'pending' | 'completed' | 'cancelled';
    totalAmount: number;
    phone: string;
    shippingAddress: TShippingAddress
}