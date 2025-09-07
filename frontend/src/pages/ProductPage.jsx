// src/pages/ProductPage.jsx

import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { products, fetchProducts, loading } = useProductStore();
  const { fetchCart } = useCartStore();
  const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { 
    fetchProducts(); 
    fetchCart();
  }, [fetchProducts, fetchCart]);

  // Real-time filtering function
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === "" || product.category === filters.category;
    const matchesMinPrice = filters.minPrice === "" || product.price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = filters.maxPrice === "" || product.price <= parseFloat(filters.maxPrice);
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const clearAllFilters = () => {
    setFilters({ category: "", minPrice: "", maxPrice: "" });
    setSearchTerm("");
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || searchTerm;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products at great prices. Filter by category and price range to find exactly what you're looking for.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            Filter Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search Filter */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Search Products</label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder-gray-400 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white text-gray-900 h-12"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Books">Books</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Toys & Games">Toys & Games</option>
                <option value="Grocery">Grocery</option>
                <option value="Furniture">Furniture</option>
                <option value="Automotive">Automotive</option>
              </select>
            </div>

            {/* Results Counter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Results</label>
              <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-center h-12 flex items-center justify-center">
                <div>
                  <span className="text-lg font-bold text-gray-900">{filteredProducts.length}</span>
                  <span className="text-sm text-gray-600 ml-1">found</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Min Price Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Min Price (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder-gray-400 h-12"
              />
            </div>

            {/* Max Price Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Max Price (₹)</label>
              <input
                type="number"
                placeholder="999999"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder-gray-400 h-12"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {hasActiveFilters ? 'Filters active' : 'No filters applied'}
              </span>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 font-medium text-sm transition-all duration-200 rounded-lg border border-red-200"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Product List Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {filteredProducts.length > 0 ? `${filteredProducts.length} Products Found` : 'Products'}
            </h2>
            {loading && (
              <div className="flex items-center text-gray-600">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            )}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-gray-400">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {products.length === 0 ? 'No Products Available' : 'No Products Match Your Filters'}
              </h3>
              <p className="text-gray-600 mb-4">
                {products.length === 0 
                  ? 'Check back later for new products.' 
                  : 'Try adjusting your search terms or filters to find what you\'re looking for.'
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
