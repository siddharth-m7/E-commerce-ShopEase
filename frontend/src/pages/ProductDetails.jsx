import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();
  const { cart, addToCart, removeFromCart, decreaseQuantity, fetchCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [product, setProduct] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Find the product from the store
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
    const foundProduct = products.find(p => p._id === id);
    setProduct(foundProduct);
  }, [id, products, fetchProducts]);

  // Update local cartItem when cart changes for this specific product
  useEffect(() => {
    if (product) {
      const item = cart.find((item) => item.productId._id === product._id);
      setCartItem(item || null);
    }
  }, [cart, product]);

  const handleAdd = async (productId, quantity = 1) => {
    // Check if user is logged in - if not, redirect to login page
    if (!user) {
      navigate('/auth?mode=login');
      return;
    }
    
    setLoading(true);
    await addToCart(productId, quantity);
    await fetchCart();
    setLoading(false);
  };

  const handleRemove = async (productId) => {
    setLoading(true);
    await removeFromCart(productId);
    await fetchCart();
    setLoading(false);
  };

  const handleDecrease = async (productId) => {
    setLoading(true);
    await decreaseQuantity(productId);
    await fetchCart();
    setLoading(false);
  };

  if (!product) {
    return (
      <div className=" bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg hover:border-red-500 hover:text-red-500 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span className="text-lg">←</span> Back
          </button>
          <div className="flex justify-center items-center h-64">
            <p className="text-center text-xl text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 relative">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg hover:border-red-500 hover:text-red-500 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span className="text-lg">←</span> Back
        </button>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="p-8 bg-gray-50 flex justify-center items-center">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full max-w-lg h-96 object-contain bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              ) : (
                <div className="w-full max-w-lg h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-md text-gray-500 text-lg">
                  No Image Available
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4 text-black">{product.name}</h1>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-3xl font-bold text-red-600">₹{product.price}</p>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Cart Controls */}
              <div className="mt-auto border-t border-gray-100 pt-6">
                {cartItem ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 bg-gray-50 p-4 rounded-lg border">
                      <button
                        onClick={() => {
                          if (cartItem.quantity > 1) {
                            handleDecrease(product._id);
                          } else {
                            handleRemove(product._id);
                          }
                        }}
                        disabled={loading}
                        className="w-12 h-12 bg-white border-2 border-gray-300 hover:border-red-500 text-black rounded-lg disabled:opacity-50 transition-all duration-200 flex items-center justify-center text-xl font-bold hover:bg-red-50 shadow-sm hover:shadow-md"
                      >
                        -
                      </button>
                      <div className="px-6 py-3 bg-white border border-gray-200 rounded-lg min-w-[120px] text-center">
                        <span className="text-sm text-gray-500 block">Quantity</span>
                        <span className="text-xl font-bold text-black">{cartItem.quantity}</span>
                      </div>
                      <button
                        onClick={() => handleAdd(product._id, 1)}
                        disabled={loading}
                        className="w-12 h-12 bg-white border-2 border-gray-300 hover:border-red-500 text-black rounded-lg disabled:opacity-50 transition-all duration-200 flex items-center justify-center text-xl font-bold hover:bg-red-50 shadow-sm hover:shadow-md"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold bg-green-50 p-3 rounded-lg border border-green-200">
                        <span className="text-lg">✓</span>
                        <span>Added to Cart</span>
                      </div>
                      <button
                        onClick={() => handleRemove(product._id)}
                        disabled={loading}
                        className="w-full px-6 py-3 bg-white border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-500 hover:text-white disabled:opacity-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAdd(product._id, 1)}
                    disabled={loading}
                    className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg font-medium disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    {loading ? "Adding..." : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
