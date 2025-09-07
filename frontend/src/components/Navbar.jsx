import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {user , logout} = useAuthStore();

  const { cart } = useCartStore();

  const cartItemCount = cart.length;

  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const username = user ? user.name : "";
  const isAdmin = user && user.role === 'admin';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate('/auth');
  }

  const handleSignup = () => {
    navigate('/auth');
  }

  const handleProducts = () => {
    navigate('/products');
  }

  const handleCart = () => {
    navigate('/cart');
  }

  const handleAdmin = () => {
    navigate('/admin');
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Website Name - Left Corner */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-xl font-bold text-white">🛍️</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent hover:from-red-600 hover:to-red-800 transition-all duration-300 cursor-pointer">
                ShopEase
              </h1>
            </button>
          </div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Products Link */}
            <button
              onClick={handleProducts}
              className="text-black hover:text-red-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-red-50"
            >
              Products
            </button>

            {/* Admin Link - Show only for admin users */}
            {isAdmin && (
              <button
                onClick={handleAdmin}
                className="text-red-700 hover:text-red-800 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md"
              >
                ⚡ Admin Panel
              </button>
            )}

            {/* Cart */}
            <div className="relative">
              <button 
                className="text-black hover:text-red-600 p-2 rounded-xl transition-all duration-300 flex items-center hover:bg-red-50 group"
                onClick={handleCart}
              >
                <span className="mr-2 text-sm font-medium">Cart</span>
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Authentication Section */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-black bg-gray-50 px-3 py-2 rounded-xl border">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{username}</span>
                  {isAdmin && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>
                <button 
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  className="text-black hover:text-red-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-red-50"
                  onClick={handleLogin}
                >
                  Log In
                </button>
                <button 
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-red-600 p-2 rounded-xl transition-all duration-300 hover:bg-red-50"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 pt-4 pb-4 space-y-3">
              {/* Products Link */}
              <button
                onClick={handleProducts}
                className="text-black hover:text-red-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full text-left hover:bg-red-50"
              >
                Products
              </button>

              {/* Admin Link - Show only for admin users */}
              {isAdmin && (
                <button
                  onClick={handleAdmin}
                  className="text-red-700 hover:text-red-800 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 bg-red-50 hover:bg-red-100 border border-red-200 w-full text-left"
                >
                  ⚡ Admin Panel
                </button>
              )}

              {/* Cart */}
              <button 
                onClick={handleCart}
                className="text-black hover:text-red-600 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-between hover:bg-red-50"
              >
                <span>Cart</span>
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="ml-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>

              {/* Authentication Section */}
              <div className="border-t border-gray-200 pt-4">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl border">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-base font-medium text-black block">{username}</span>
                        {isAdmin && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button 
                      onClick={handleLogin}
                      className="w-full text-left text-black hover:text-red-600 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-red-50"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={handleSignup}
                      className="w-full text-left bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 shadow-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
