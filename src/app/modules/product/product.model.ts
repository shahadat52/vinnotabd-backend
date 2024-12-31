import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
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
    },
});

const ProductModel = model('Product', productSchema);

export default ProductModel;
