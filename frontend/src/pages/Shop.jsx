import { useEffect, useState } from "react";
import axios from "axios";

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

  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar />
    <div className="shop-container">
      <h2>Browse All Books</h2>
      <div className="shop-grid">
        {books.map((book) => (
          <div className="book-card" key={book.primary_isbn13}>
            <img src={book.book_image} alt={book.title} />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">$19.99</p> {/* You can simulate price */}
              <button className="add-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Shop;
