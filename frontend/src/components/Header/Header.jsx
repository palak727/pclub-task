import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import ChatInbox from '../Chat/ChatInbox';
import iitkLogo from '../../assets/iitk_logo.jpeg';

const Header = () => {
  // 1. Fetch user, logout, cart, unreadCount, and getCartCount from ShopContext
  const { user, logout, cartItems, getCartCount, unreadCount } = useShop();
  const [showInbox, setShowInbox] = useState(false);

  // Helper to get total cart count whether cartItems is an object or array
  const totalCartCount = getCartCount 
    ? getCartCount() 
    : (Array.isArray(cartItems) ? cartItems.length : Object.values(cartItems || {}).reduce((a, b) => a + b, 0));

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={iitkLogo}
              alt="IIT Kanpur Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">IITK Marketplace</h1>
              <p className="text-[11px] text-slate-500 font-medium">Campus buy & sell</p>
            </div>
          </Link>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coolers, mattresses, cycles..."
                className="input-field py-2 text-sm bg-slate-100/70 border-transparent focus:bg-white"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* 1. Home Link */}
            <Link
              to="/"
              className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* 2. Sell Link */}
            <Link
              to="/dashboard"
              className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span className="hidden sm:inline">Sell</span>
            </Link>

            {/* Chat Inbox Button */}
            <button
              onClick={() => setShowInbox(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative cursor-pointer"
              title="Messages"
            >
              Messages
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
              title="Cart"
            >
              Cart
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="flex items-center gap-2 pl-1">
                <span className="text-sm font-semibold text-slate-700 hidden sm:inline">
                  {user.name || user.email?.split('@')[0]}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowInbox(false);
                    logout();
                  }}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary py-2 px-4 text-xs sm:text-sm font-semibold"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

        </div>
      </header>

      {/* Chat Inbox Pop-up Modal */}
      {showInbox && <ChatInbox onClose={() => setShowInbox(false)} />}
    </>
  );
};

export default Header;