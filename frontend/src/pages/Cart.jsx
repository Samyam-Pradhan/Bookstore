import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineTrash, HiArrowRight } from "react-icons/hi2";
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
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <main className="grow max-w-6xl mx-auto w-full px-6 pt-28 pb-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
              Your Selection
            </p>
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
          {cart.length > 0 && (
            <span className="bg-yellow-400 text-white text-sm font-medium px-3 py-1 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-9 h-9 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm tracking-wide">Fetching your cart…</p>
          </div>
        ) : cart.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <CiShoppingCart className="text-7xl text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
            <p className="text-gray-400 text-sm max-w-xs text-center">
              Looks like you haven't added any books yet. Explore our collection!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-3 rounded-full bg-gray-900 text-white font-medium flex items-center gap-2 hover:bg-gray-800 transition"
            >
              Browse Books <HiArrowRight />
            </button>
          </div>
        ) : (
          // Cart items + summary
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.isbn}
                  className={`flex gap-5 items-start p-5 rounded-2xl bg-white shadow hover:shadow-lg transition ${
                    removingId === item.isbn ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <div className="w-1 bg-yellow-400 rounded-full" />

                  <div className="grow min-w-0">
                    <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">{item.author}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-xs text-gray-400">
                        Rs. {item.price} / each
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-3 shrink-0">
                    <p className="text-base font-semibold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item)}
                      disabled={removingId === item.isbn}
                      className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-900 hover:text-white transition"
                    >
                      <HiOutlineTrash size={14} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-gray-900 text-white p-6 rounded-2xl sticky top-28 space-y-5">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                </div>

                <hr className="border-gray-700 my-2" />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition"
                >
                  Proceed to Checkout <HiArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full text-gray-400 text-sm py-2 hover:text-gray-200 transition-colors"
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