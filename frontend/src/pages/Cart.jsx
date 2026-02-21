import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("/api/cart", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCart(res.data.items))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CiShoppingCart /> My Cart
      </h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item._id} className="flex justify-between border p-4 rounded">
              <span>{item.productId.title}</span>
              <span>Qty: {item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;