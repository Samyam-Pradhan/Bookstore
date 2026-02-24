import React, { useState } from "react";
import axios from "axios";

const Signup = ({ onSuccess, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
        "http://localhost:5000/api/auth/signup",
        formData
      );

      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-8">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors text-xl"
        aria-label="Close"
      >
        ✕
      </button>
      <div className="mb-8">
        <div className="w-8 h-0.5 bg-gray-300 mb-4" />
        <h2 className="font-serif text-3xl text-gray-900">Create Account</h2>
        <p className="text-gray-500 text-sm mt-2 font-light">
          Join our community of readers
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
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
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-200 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
            required
          />
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-red-600 text-xs uppercase tracking-wider">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={onLoginClick || onClose}
            className="text-gray-900 font-medium hover:underline underline-offset-4 transition-colors"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;