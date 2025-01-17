/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductModel from "./product.model";

const createProductsInDB = async (productData: any) => {
    const result = await ProductModel.create(productData);
    return result
};

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
    // const queryObj = { ...query };

    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query.searchTerm as string;
    }


    if (query.searchTerm) {
        const searchQuery = await ProductModel.find({
            $or: ['name', 'size', 'category', 'subCategory'].map(
                (field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                }),
            ),
        });
        return searchQuery
    }

    if (query?.subCategory) {
        const filterQuery = await ProductModel.find({
            $and: [{ 'subCategory': query.subCategory }]
        });
        return filterQuery
    }

    const result = await ProductModel.find()
    return result
};

const getSingleProductById = async (id: string) => {
    const result = await ProductModel.findById(id);
    return result
};
const deleteSingleProductById = async (id: string) => {
    const result = await ProductModel.findByIdAndDelete(id);
    return result
};

export const productServices = {
    createProductsInDB,
    getAllProductsFromDb,
    getSingleProductById,
    deleteSingleProductById
}