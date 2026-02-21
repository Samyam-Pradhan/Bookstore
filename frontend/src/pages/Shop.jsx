import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`)
      .then((res) => setBooks(res.data.results.books))
      .catch(() => setError("Failed to load books."));
  }, [apiKey]);

  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-stone-50">
        {/* Header */}
        <div className="text-center pt-20 pb-12 px-6">
          <p className="text-xs tracking-widest uppercase text-amber-700 mb-3 font-medium">
            NYT Bestsellers · Hardcover Fiction
          </p>
          <h1 className="text-5xl font-bold text-stone-900 font-serif">
            The Reading List
          </h1>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {books.map((book) => (
            <div
              key={book.primary_isbn13}
              className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              {/* Cover */}
              <div className="relative aspect-[2/3] overflow-hidden bg-stone-200">
                <img
                  src={book.book_image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-stone-900 text-stone-100 text-[10px] font-medium tracking-wider px-2 py-1 rounded-sm">
                  #{book.rank}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-stone-900 text-sm leading-snug line-clamp-2 mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-stone-400 font-light mb-4">{book.author}</p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-800">$19.99</span>
                  <button className="text-xs font-medium bg-stone-900 text-stone-50 px-3 py-1.5 rounded-sm hover:bg-amber-700 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Shop;