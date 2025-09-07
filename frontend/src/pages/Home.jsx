import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const { user } = useAuthStore();
    const { products, fetchProducts, loading } = useProductStore();
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        // Get 4 random products as featured products
        if (products.length > 0) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setFeaturedProducts(shuffled.slice(0, 4));
        }
    }, [products]);

    const categories = [
        { name: "Electronics", icon: "📱", color: "bg-blue-500" },
        { name: "Clothing", icon: "👕", color: "bg-purple-500" },
        { name: "Books", icon: "📚", color: "bg-green-500" },
        { name: "Home", icon: "🏠", color: "bg-orange-500" },
        { name: "Sports", icon: "⚽", color: "bg-red-500" },
        { name: "Beauty", icon: "💄", color: "bg-pink-500" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-50 to-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
                            Welcome to{" "}
                            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                                ShopEase
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                            Discover amazing products at unbeatable prices. Your one-stop destination for everything you need.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/products')}
                                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Shop Now
                            </button>
                            {!user && (
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="px-8 py-4 bg-white hover:bg-gray-50 text-red-600 font-semibold rounded-xl border-2 border-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Sign Up
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-100 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute top-1/2 left-0 w-16 h-16 bg-red-300 rounded-full opacity-40 animate-ping"></div>
            </section>

            {/* Categories Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-lg text-gray-600">
                            Find exactly what you're looking for
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer"
                                onClick={() => navigate(`/products?category=${category.name}`)}
                            >
                                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform group-hover:-translate-y-2 transition-all duration-300 text-center">
                                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="font-semibold text-black group-hover:text-red-600 transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                            Featured Products
                        </h2>
                        <p className="text-lg text-gray-600">
                            Handpicked items just for you
                        </p>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-lg text-gray-600">Loading amazing products...</span>
                            </div>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🛍️</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Yet</h3>
                            <p className="text-gray-500 mb-6">Be the first to discover our amazing collection!</p>
                            <button
                                onClick={() => navigate('/products')}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-300"
                            >
                                Explore Products
                            </button>
                        </div>
                    )}

                    {featuredProducts.length > 0 && (
                        <div className="text-center mt-12">
                            <Link
                                to="/products"
                                className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                View All Products
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-2">
                                {products.length}+
                            </div>
                            <div className="text-gray-600 font-medium">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-2">1000+</div>
                            <div className="text-gray-600 font-medium">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-2">24/7</div>
                            <div className="text-gray-600 font-medium">Support</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-2">99%</div>
                            <div className="text-gray-600 font-medium">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Start Shopping?
                    </h2>
                    <p className="text-xl text-red-100 mb-8">
                        Join thousands of satisfied customers and discover the best deals online.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/products')}
                            className="px-8 py-4 bg-white hover:bg-gray-100 text-red-600 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Browse Products
                        </button>
                        {!user && (
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-8 py-4 bg-transparent hover:bg-red-600 text-white font-semibold rounded-xl border-2 border-white transform hover:scale-105 transition-all duration-300"
                            >
                                Create Account
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}