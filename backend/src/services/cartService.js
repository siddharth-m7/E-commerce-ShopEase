const User = require( '../models/User.js');

// adding item to cart
const addToCart = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const existing = user.cart.find(
        (c) => c.productId.toString() === productId
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        user.cart.push({ productId, quantity });
    }

    await user.save();
    
    // Populate product details before returning
    const populatedUser = await User.findById(userId).populate('cart.productId');
    return populatedUser.cart;
};

// get user's cart
const getMyCart = async (userId) => {
    const user = await User.findById(userId).populate('cart.productId');
    if (!user) {
        throw new Error('User not found');
    }
    return user.cart;
};


// remove item from cart
const removeFromCart = async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    user.cart = user.cart.filter(
        (c) => c.productId.toString() !== productId
    );

    await user.save();
    
    // Populate product details before returning
    const populatedUser = await User.findById(userId).populate('cart.productId');
    return populatedUser.cart;
};

const clearCart = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.cart = [];
    await user.save();
    
    // Populate product details before returning (empty array)
    const populatedUser = await User.findById(userId).populate('cart.productId');
    return populatedUser.cart;
};

const decreaseQuantity = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const item = user.cart.find(
        (c) => c.productId.toString() === productId
    );

    if (item) {
        item.quantity -= quantity;
        if (item.quantity < 1) {
            user.cart = user.cart.filter(
                (c) => c.productId.toString() !== productId
            );
        }
    } else {
        throw new Error('Product not in cart');
    }

    await user.save();
    
    // Populate product details before returning
    const populatedUser = await User.findById(userId).populate('cart.productId');
    return populatedUser.cart;
};

module.exports = {
    addToCart,
    getMyCart,
    removeFromCart,
    clearCart,
    decreaseQuantity
};
