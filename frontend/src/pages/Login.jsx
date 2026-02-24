import React, { useState } from "react";
import axios from "axios";

const Login = ({ onSuccess, onClose, onSignupClick }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onSuccess(); // close modal & update navbar
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-8">
      {/* Close Button - Minimal */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Header - Editorial */}
      <div className="mb-8">
        <div className="w-8 h-0.5 bg-gray-300 mb-4" />
        <h2 className="font-serif text-3xl text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-2 font-light">
          Log in to your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      
    </div>
  );
};

export default Login;