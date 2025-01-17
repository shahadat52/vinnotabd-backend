import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
    },
    zoomImg: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: 0,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        required: [true, 'Status is required'],
        default: 'available'
    },
    offerPrice: {
        type: Number,
        min: 0,
        default: 0
    },
    size: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    subCategory: {
        type: String,
        required: true,
        trim: true,
    },
    ratings: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 4.5
    },
});

const ProductModel = model('Product', productSchema);

export default ProductModel;
