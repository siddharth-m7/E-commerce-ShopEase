// src/pages/CartPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const { cart, fetchCart, addToCart, removeFromCart, decreaseQuantity, clearCart, loading } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
  };

  const handleIncrease = async (productId) => {
    await addToCart(productId, 1);
  };

  const handleDecrease = async (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      await decreaseQuantity(productId);
    } else {
      await removeFromCart(productId);
    }
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const handleCheckout = async () => {
    try {
      // Clear the cart
      await clearCart();
      // Navigate to success page
      navigate('/order-success');
    } catch (error) {
      console.error('Checkout failed:', error);
      // You could add error handling here if needed
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">My Cart</h1>
          <p className="text-gray-600">Review and manage your selected items</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600">Loading your cart...</p>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m-6 0V9a2 2 0 112-4h.01M19 9v6a2 2 0 11-4 0V9a2 2 0 114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding some products to your cart</p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => {
                const price = item.productId?.price || 0;
                const quantity = item.quantity || 0;
                const totalPrice = price * quantity;
                
                return (
                  <div
                    key={item.productId?._id || Math.random()}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Product Info */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-black mb-2">
                          {item.productId?.name || "Unknown Product"}
                        </h2>
                        <div className="space-y-1">
                          <p className="text-gray-600">Price per item: <span className="font-semibold text-red-600">₹{price.toFixed(2)}</span></p>
                          <p className="text-lg font-bold text-black">Total: <span className="text-red-600">₹{totalPrice.toFixed(2)}</span></p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border">
                          <button
                            onClick={() => handleDecrease(item.productId?._id, quantity)}
                            disabled={loading}
                            className="w-10 h-10 bg-white border-2 border-gray-300 hover:border-red-500 text-black rounded-lg disabled:opacity-50 transition-all duration-200 flex items-center justify-center text-lg font-bold hover:bg-red-50 shadow-sm hover:shadow-md"
                          >
                            -
                          </button>
                          <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center text-lg font-bold">
                            {quantity}
                          </div>
                          <button
                            onClick={() => handleIncrease(item.productId?._id)}
                            disabled={loading}
                            className="w-10 h-10 bg-white border-2 border-gray-300 hover:border-red-500 text-black rounded-lg disabled:opacity-50 transition-all duration-200 flex items-center justify-center text-lg font-bold hover:bg-red-50 shadow-sm hover:shadow-md"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.productId?._id)}
                          disabled={loading}
                          className="px-4 py-2 bg-white border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-500 hover:text-white disabled:opacity-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary and Actions */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Cart Summary</h3>
                    <p className="text-gray-600">
                      Total Items: <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      Total Amount: ₹{cart.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleClearCart}
                      disabled={loading}
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-500 hover:text-red-500 disabled:opacity-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                      {loading ? "Clearing..." : "Clear Cart"}
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
