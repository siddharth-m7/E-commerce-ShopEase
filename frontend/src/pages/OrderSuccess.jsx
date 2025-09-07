// src/pages/OrderSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-green-300 rounded-full opacity-25 animate-ping"></div>
      
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl text-center relative overflow-hidden">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-black mb-4">
            Order Placed Successfully! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Thank you for shopping with ShopEase
          </p>
          
          <p className="text-gray-500">
            Your order has been confirmed and is being processed
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
          <h2 className="text-2xl font-bold text-black mb-4">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold text-black mb-1">Order Confirmed</h3>
              <p className="text-sm text-gray-600">We've received your order</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-black mb-1">Processing</h3>
              <p className="text-sm text-gray-600">Preparing your items</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="font-semibold text-black mb-1">On the Way</h3>
              <p className="text-sm text-gray-600">Fast delivery to you</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-xl font-bold text-black mb-4 text-center">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium text-black">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium text-black">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-medium text-green-600">✓ Confirmed</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              🏠 Go to Homepage
            </span>
          </button>
          
          <button
            onClick={handleContinueShopping}
            className="px-8 py-4 bg-white hover:bg-gray-50 text-black border-2 border-gray-300 hover:border-red-500 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              🛍️ Continue Shopping
            </span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-2">
            Need help? Contact our customer support
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="text-gray-400">📧 support@shopease.com</span>
            <span className="text-gray-400">📞 1-800-SHOPEASE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
