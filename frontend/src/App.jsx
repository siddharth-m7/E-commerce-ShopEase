import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useCartStore } from './store/cartStore';
import { useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage.jsx';
import Navbar from './components/Navbar';

function App() {

  const { user, fetchProfile } = useAuthStore();
  const { fetchCart, resetCart } = useCartStore();

  useEffect(() => {
    fetchProfile(); // check cookie when app loads
  }, [fetchProfile]);

  // Handle cart management based on user authentication
  useEffect(() => {
    if (user) {
      // User is logged in, fetch their cart
      fetchCart();
    } else {
      // User is logged out, reset cart store
      resetCart();
    }
  }, [user, fetchCart, resetCart]);

  return (
   <Router>
    <Navbar />
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
   </Router>
  )
}

export default App

