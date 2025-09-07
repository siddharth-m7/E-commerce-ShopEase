const express = require('express');
const {
    createProductController,
    getAllProductsController,
    getProductsByCategoryController,
    getProductsByPriceRangeController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    filterProductsController
} = require('../controllers/productController');

const {authenticate, authorizeRoles} = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/', authenticate, authorizeRoles('admin'), createProductController);
router.get('/', getAllProductsController);
// router.get('/category/:category', getProductsByCategoryController);
// router.get('/price', getProductsByPriceRangeController);
router.get('/filter', filterProductsController); 
router.get('/:id', getProductByIdController);
router.put('/:id', authenticate, authorizeRoles('admin'), updateProductController);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteProductController);

module.exports = router;