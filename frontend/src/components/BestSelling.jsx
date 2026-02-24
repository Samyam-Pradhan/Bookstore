import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BestSelling = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`
        );
        setBooks(res.data.results.books.slice(0, 5));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books.");
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
    <section className="bg-[#FDFCF7] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-black/20" />
          </div>
        <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-900 mb-16">
          NYT Bestsellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.map((book, index) => (
            <Link
              key={book.primary_isbn13 || index}
              to={`/book/${book.primary_isbn13}`}
              state={{ book }}
              className="group block"
            >
              <div className="space-y-3">
                <div className="relative aspect-2/3 overflow-hidden bg-white">
                  <img
                    src={book.book_image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-serif text-sm font-medium text-gray-900 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500">
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

export default BestSelling;