import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Feature = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

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

  if (error)
    return <div className="text-red-600 text-center py-6">{error}</div>;

  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
           New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.map((book, index) => (
            <Link
              key={index}
              to={`/book/${book.primary_isbn13}`}
              state={{ book }}
              className="group bg-white shadow hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden flex flex-col h-full cursor-pointer"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={book.book_image}
                  alt={book.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 text-center flex flex-col grow">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
