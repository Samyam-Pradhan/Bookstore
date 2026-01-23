import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
        const res = await axios.get(url);
        setBooks(res.data.results.books);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books");
      }
    };
    fetchBooks();
  }, [apiKey]);

  if (error) return <p className="text-red-600 text-center py-6">{error}</p>;

  return (
    <>
      <Navbar />
      <section className="bg-[#FFFAF0] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
            Browse All Books
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {books.map((book) => (
              <div
                key={book.primary_isbn13}
                className="group bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={book.book_image}
                    alt={book.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col grow text-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
                  <p className="text-base font-semibold text-indigo-600 mb-4">
                    $19.99
                  </p>
                  <button className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Shop;
