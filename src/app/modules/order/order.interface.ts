import { Types } from 'mongoose';

export interface TOrderItem {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface TGuestInfo {
    name: string;
    email: string;
    phone: string;
}

export interface TShippingAddress {
    name: string;
    phone: string;
    addressLine: string;
}

export interface TOrder {
    _id?: Types.ObjectId;
    user?: Types.ObjectId; // Optional for guests
    guestInfo?: TGuestInfo; // Optional for logged-in users
    items: TOrderItem[];
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: TShippingAddress;
    totalAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
}
