import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Feature = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);

  const API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      setError("API key not found. Check your .env file.");
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2025-10-10&api-key=${API_KEY}`
        );

        const booksData = res.data.results.lists?.[0]?.books || [];
        setBooks(booksData.slice(0, 5));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch new arrivals.");
      }
    };

    fetchBooks();
  }, [API_KEY]);

  if (error) {
    return (
      <div className="bg-[#FFFAF1] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#FDFCF7] py-24 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-black/20" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900">
            New Arrivals
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.map((book, index) => (
            <Link
              key={book.primary_isbn13 || index}
              to={`/book/${book.primary_isbn13}`}
              state={{ book }}
              className="group block"
              onMouseEnter={() => setHoveredBook(book.primary_isbn13)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <div className="space-y-4">
                <div className="relative aspect-2/3 overflow-hidden bg-white">
                  <img
                    src={book.book_image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-serif text-base font-medium text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    {book.author}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;