import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart, decreaseQuantity, fetchCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update local cartItem when cart changes for this specific product
  useEffect(() => {
    const item = cart.find((item) => item.productId._id === product._id);
    setCartItem(item || null);
  }, [cart, product._id]);

  const handleAdd = async (productId, quantity = 1) => {
    // Check if user is logged in - if not, redirect to login page
    if (!user) {
      navigate('/auth?mode=login');
      return;
    }
    
    setLoading(true);
    await addToCart(productId, quantity);
    await fetchCart(); // Refresh cart to get updated state
    setLoading(false);
  };

  const handleRemove = async (productId) => {
    setLoading(true);
    await removeFromCart(productId);
    await fetchCart(); // Refresh cart to get updated state
    setLoading(false);
  };

  const handleDecrease = async (productId) => {
    setLoading(true);
    await decreaseQuantity(productId);
    await fetchCart(); // Refresh cart to get updated state
    setLoading(false);
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col group relative">
      <Link to={`/product/${product._id}`} className="block">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-contain bg-gray-50 rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 group-hover:bg-gray-200 transition-colors duration-300">
            <span className="text-sm">No Image Available</span>
          </div>
        )}
        <h2 className="text-xl font-bold mb-2 text-black group-hover:text-red-600 transition-colors duration-300 line-clamp-2">{product.name}</h2>
        <p className="mb-3 text-gray-700 text-sm line-clamp-3 group-hover:text-gray-900 transition-colors duration-300">{product.description}</p>
        <p className="text-2xl font-bold text-green-600 mb-4">₹{product.price}</p>
      </Link>
      <div className="mt-auto pt-4">
        {cartItem ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-lg p-3">
              <button
                onClick={() => {
                  if (cartItem.quantity > 1) {
                    handleDecrease(product._id);
                  } else {
                    handleRemove(product._id);
                  }
                }}
                disabled={loading}
                className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full disabled:opacity-50 transition-all duration-200 hover:scale-110"
              >
                -
              </button>
              <span className="px-4 py-1 bg-white border border-gray-300 rounded-lg font-semibold text-black min-w-[3rem] text-center">{cartItem.quantity}</span>
              <button
                onClick={() => handleAdd(product._id, 1)}
                disabled={loading}
                className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full disabled:opacity-50 transition-all duration-200 hover:scale-110"
              >
                +
              </button>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                ✓ In Cart
              </span>
            </div>
          </div>
        ) : (
          <button
            onClick={() => handleAdd(product._id, 1)}
            disabled={loading}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold disabled:opacity-50 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
