import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const BookDetails = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`
        );

        const decodedTitle = decodeURIComponent(title);

        const foundBook = res.data.results.books.find(
          (b) => b.title.toLowerCase() === decodedTitle.toLowerCase()
        );

        setBook(foundBook);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [title, API_KEY]);

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!book) return <p className="text-center py-6">Book not found</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-8 py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-2xl shadow-xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Book Image */}
          <div className="relative group">
            <img
              src={book.book_image}
              alt={book.title}
              className="w-full object-cover rounded-2xl shadow-2xl transform group-hover:rotate-1 group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-serif font-bold mb-8 text-gray-900 tracking-wide">
              {book.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                Author: {book.author}
              </span>
              <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Publisher: {book.publisher}
              </span>
              <span className="px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                Rank #{book.rank}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-10">
              {book.description}
            </p>

            <div className="flex gap-4">
              <button className="px-10 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                Add to Cart
              </button>
              <button className="px-10 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetails;
