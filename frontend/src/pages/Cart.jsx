import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import axios from "axios";
import Footer from "../components/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.items || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleRemove = async (item) => {
    const token = localStorage.getItem("access_token");
    setRemovingId(item.isbn);
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${item.isbn}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(cart.filter((i) => i.isbn !== item.isbn));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item from cart");
    } finally {
      setRemovingId(null);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#FFFAF1] min-h-screen flex flex-col">
      <main className="grow max-w-5xl mx-auto w-full px-6 pt-24 pb-16">
        {/* Header - Minimalist */}
        <div className="mb-12">
          <div className="w-10 h-0.5 bg-gray-300 mb-4" />
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
                Your Selection
              </p>
              <h1 className="font-serif text-4xl text-gray-900">Shopping Cart</h1>
            </div>
            {cart.length > 0 && (
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border border-gray-300 border-t-gray-900 rounded-full animate-spin" />
            <p className="text-gray-400 text-xs uppercase tracking-widest">Loading cart...</p>
          </div>
        ) : cart.length === 0 ? (
          // Empty state - Minimalist
          <div className="flex flex-col items-center justify-center py-28 gap-6">
            <div className="text-7xl opacity-20">🛒</div>
            <h2 className="font-serif text-2xl text-gray-700">Your cart is empty</h2>
            <p className="text-gray-400 text-sm max-w-xs text-center font-light">
              Looks like you haven't added any books yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-8 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Browse Books
            </button>
          </div>
        ) : (
          // Cart items + summary
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.isbn}
                  className={`flex gap-6 items-start pb-6 border-b border-gray-200 transition-opacity ${
                    removingId === item.isbn ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                      {item.author}
                    </p>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-gray-400">
                        ${item.price} each
                      </span>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between gap-3">
                    <p className="font-serif text-lg text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item)}
                      disabled={removingId === item.isbn}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <HiOutlineTrash size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary - Minimalist */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 p-8 sticky top-28 space-y-6">
                <h2 className="font-serif text-xl text-gray-900 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-400">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="font-serif text-base text-gray-900">Total</span>
                  <span className="font-serif text-xl text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full text-center text-xs text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;