const express = require('express');
const { 
    addToCartController,
    getMyCartController,
    removeFromCartController,
    clearCartController,
    decreaseQuantityController } = require('../controllers/cartController');

const {authenticate} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/',authenticate, addToCartController);
router.get('/',authenticate, getMyCartController);
router.delete('/:id',authenticate, removeFromCartController);
router.patch('/:id',authenticate, decreaseQuantityController);
router.delete('/',authenticate, clearCartController);

module.exports = router;