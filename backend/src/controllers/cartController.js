const { 
    addToCart,
    getMyCart,
    removeFromCart,
    clearCart,
    decreaseQuantity
} = require('../services/cartService');

// add to cart controller
const addToCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        // console.log(req.body);
        const userId = req.user.userId;
        const cart = await addToCart(userId, productId, quantity);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }   
}

// get user's cart controller
const getMyCartController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = await getMyCart(userId);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// remove item from cart controller
const removeFromCartController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.id;
        
        const cart = await removeFromCart(userId, productId);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const decreaseQuantityController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.id;

        const cart = await decreaseQuantity(userId, productId, 1);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const clearCartController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = await clearCart(userId);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    addToCartController,
    getMyCartController,
    removeFromCartController,
    clearCartController,
    decreaseQuantityController
};