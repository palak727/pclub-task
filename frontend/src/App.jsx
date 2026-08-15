import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ChatWidget from './components/Chat/ChatWidget';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignUp from './pages/LoginSignUp';
import ForgotPassword from './pages/ForgotPassword'; // <--- Import Forgot Password Component
import Dashboard from './pages/Dashboard';

function App() {
  // Active User State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // User-Specific Cart Items
  const [cartItems, setCartItems] = useState([]);

  // Load User Cart whenever User changes
  useEffect(() => {
    if (user && user.email) {
      const userCartKey = `cart_${user.email}`;
      const savedCart = localStorage.getItem(userCartKey);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Sync Cart changes to localStorage for active user
  const saveCart = (newCart) => {
    setCartItems(newCart);
    if (user && user.email) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(newCart));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/category/:category" element={<ShopCategory />} />
          <Route path="/coolers" element={<Navigate to="/category/coolers" replace />} />
          <Route path="/matress" element={<Navigate to="/category/mattresses" replace />} />
          <Route path="/mattresses" element={<Navigate to="/category/mattresses" replace />} />
          <Route path="/cycles" element={<Navigate to="/category/cycles" replace />} />
          <Route path="/product/:productId" element={<Product cartItems={cartItems} setCartItems={saveCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={saveCart} />} />
          <Route path="/login" element={<LoginSignUp setUser={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <--- Added Route */}
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;