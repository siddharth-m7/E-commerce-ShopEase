const Product = require('../models/Product');

// creating a new product 
const createProduct = async (productData) => {
    try {
        const product = await Product.create(productData);
        return product;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }   
}


// fetching all products
const getAllProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }    
}

// fetching products by category
const getProductsByCategory = async (category) => {
    try {
        const products = await Product.find({ category });
        return products;  
    } catch (error) {
        throw new Error('Error fetching products by category: ' + error.message);         
    }
}

// fetching a product by price range
const getProductsByPriceRange = async (minPrice, maxPrice) => {
    try {
        const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
        return products;   
    } catch (error) {
        throw new Error('Error fetching products by price range: ' + error.message);         
    } 
}

// fetching a product by ID for product details page of react
const getProductById = async (productId) => {
    try {   
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        throw new Error('Error fetching product by ID: ' + error.message);         
    }
}

// updating a product
const updateProduct = async (productId, updateData) => {
    try {
        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        return product;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);         
    }
}

// deleting a product
const deleteProduct = async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);         
    }
}


// Filter products by category and price range
const filterProducts = async ({ category, minPrice, maxPrice }) => {
    try {
        const query = {};
        if (category) query.category = category;
        if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        } else if (minPrice !== undefined) {
            query.price = { $gte: Number(minPrice) };
        } else if (maxPrice !== undefined) {
            query.price = { $lte: Number(maxPrice) };
        }
        const products = await Product.find(query);
        return products;
    } catch (error) {
        throw new Error('Error filtering products: ' + error.message);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    getProductsByPriceRange,
    getProductById,
    updateProduct,
    deleteProduct,
    filterProducts
};