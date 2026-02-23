import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const BookDetails = () => {
  const { isbn } = useParams();
  const location = useLocation();

  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    // If book already passed from Link state, skip fetching
    if (book) return;

    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`
        );

        const lists = res.data.results.lists || [];

        let foundBook = null;

        for (const list of lists) {
          foundBook = list.books.find(
            (b) => b.primary_isbn13 === isbn
          );
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

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center py-6 text-red-600">{error}</p>;
  if (!book) return <p className="text-center py-6">Book not found</p>;

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen px-6"
        style={{ backgroundColor: "#F4F3F3" }}
      >
        <div className="max-w-5xl w-full bg-[#F4F3F3] p-12 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Book Image (Left) */}
          <div className="flex justify-center">
            <img
              src={book.book_image}
              alt={book.title}
              className="w-72 h-auto object-cover"
            />
          </div>

          {/* Book Details (Right) */}
          <div className="flex flex-col text-left">
            <h1 className="text-3xl font-serif font-bold mb-6 text-gray-900">
              {book.title}
            </h1>

            <div className="space-y-2 text-gray-700 mb-6">
              <p>
                <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p>
                <span className="font-semibold">Publisher:</span> {book.publisher}
              </p>
              <p>
                <span className="font-semibold">Rank:</span> #{book.rank}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              {book.description}
            </p>

            <button className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetails;