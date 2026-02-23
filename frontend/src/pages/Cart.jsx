import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import Footer from "../components/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCart(res.data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [navigate]);

  const handleRemove = async (itemId) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(cart.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow max-w-6xl mx-auto p-6 mt-24">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CiShoppingCart /> My Cart
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.productId.title}</h3>
                    <p className="text-sm text-gray-500">
                      Price: Rs. {item.productId.price}
                    </p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right font-bold text-lg">
              Total: Rs. {totalPrice}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;