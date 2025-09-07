const {createProduct, getAllProducts, getProductsByCategory, getProductsByPriceRange, getProductById, updateProduct, deleteProduct, filterProducts} = require('../services/ProductService');
// Controller to filter products by category and price
const filterProductsController = async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;
        const products = await filterProducts({ category, minPrice, maxPrice });
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to create a new product
const createProductController = async (req, res) => {
    try {
        const productData = req.body;
        const product = await createProduct(productData);
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to get all products
const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to get products by category
const getProductsByCategoryController = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await getProductsByCategory(category);
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to get products by price range
const getProductsByPriceRangeController = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const products = await getProductsByPriceRange(Number(minPrice), Number(maxPrice));
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to get a product by ID
const getProductByIdController = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await getProductById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to update a product
const updateProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const product = await updateProduct(productId, updateData);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to delete a product
const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await deleteProduct(productId);
        res.status(200).json({ success: true, message: 'Product deleted successfully', product });
    } catch (error) {
        if (error.message.includes('Product not found')) {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createProductController,
    getAllProductsController,
    getProductsByCategoryController,
    getProductsByPriceRangeController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    filterProductsController
};

