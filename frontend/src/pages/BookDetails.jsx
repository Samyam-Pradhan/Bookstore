import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const BookDetails = () => {
  const { isbn } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    if (book) return;

    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`
        );

        const lists = res.data.results.lists || [];
        let foundBook = null;

        for (const list of lists) {
          foundBook = list.books.find((b) => b.primary_isbn13 === isbn);
          if (foundBook) break;
        }

        setBook(foundBook);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [isbn, API_KEY, book]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login first!");
      navigate("/"); 
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          isbn: book.primary_isbn13,
          title: book.title,
          author: book.author,
          image: book.book_image,
          price: 500,
          quantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAdded(true);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to add book to cart";
      alert(msg);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="bg-[#FFFAF1] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4" />
          <p className="text-gray-400 text-sm uppercase tracking-widest">Loading book...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-[#FFFAF1] min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4 opacity-30">📖</div>
          <h2 className="font-serif text-2xl text-gray-900 mb-3">Book Not Found</h2>
          <p className="text-gray-500 text-sm mb-8">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-[#FFFAF1] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest">Book not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#FFFAF1] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>

          {/* Book Details - Editorial Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Book Cover - Left - Smaller */}
            <div className="relative flex justify-center md:justify-start">
              <div className="w-64 md:w-72">
                <div className="bg-white shadow-md overflow-hidden">
                  <img
                    src={book.book_image}
                    alt={book.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Publisher Note */}
                {book.publisher && (
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    {book.publisher}
                  </p>
                )}
              </div>
            </div>

            {/* Book Info - Right - Tighter */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="w-10 h-0.5 bg-gray-300 mb-3" />
                <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2 leading-tight">
                  {book.title}
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  by <span className="text-gray-700">{book.author}</span>
                </p>
              </div>

              {/* Description - Compact */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  {book.description || "No description available for this book."}
                </p>
              </div>

              {/* Metadata Grid - Compact */}
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-gray-200">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Publisher</p>
                  <p className="text-xs text-gray-700">{book.publisher || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">ISBN</p>
                  <p className="text-xs text-gray-700 font-mono">{book.primary_isbn13}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Weeks on List</p>
                  <p className="text-xs text-gray-700">{book.weeks_on_list || 1} weeks</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Price</p>
                  <p className="text-xs text-gray-700 font-serif">$12.99</p>
                </div>
              </div>

              {/* Buy Section - Compact */}
              <div className="space-y-3">
                {/* Quantity Selector - Smaller */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-200 w-28">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center text-xs text-gray-700">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button - Compact */}
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`w-full py-3 text-xs uppercase tracking-widest transition-colors ${
                    added
                      ? "bg-gray-200 text-gray-500 cursor-default"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {added ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetails;