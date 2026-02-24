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
  const [added, setAdded] = useState(false); // track if book is added
  const [quantity, setQuantity] = useState(1); // new quantity state

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

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center py-6 text-red-600">{error}</p>;
  if (!book) return <p className="text-center py-6">Book not found</p>;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-6 bg-gray-100">
        <div className="max-w-5xl w-full p-12 grid md:grid-cols-2 gap-12 items-center bg-gray-100">
          <div className="flex justify-center">
            <img src={book.book_image} alt={book.title} className="w-72 h-auto object-cover" />
          </div>

          <div className="flex flex-col text-left">
            <h1 className="text-3xl font-serif font-bold mb-6 text-gray-900">{book.title}</h1>

            <div className="space-y-2 text-gray-700 mb-6">
              <p><span className="font-semibold">Author:</span> {book.author}</p>
              <p><span className="font-semibold">Publisher:</span> {book.publisher}</p>
              <p><span className="font-semibold">Rank:</span> #{book.rank}</p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">{book.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`px-8 py-3 font-medium transition ${
                  added
                    ? "bg-green-500 text-white cursor-default"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {added ? "Added to Cart" : "Add to Cart"}
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