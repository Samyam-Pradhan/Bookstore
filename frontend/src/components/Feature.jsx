import React, { useEffect, useState } from 'react';
import "../styles/Feature.css";
import axios from 'axios';

const Feature = () => {
  const [books, setBooks] = useState([]);
/*   const [loading, setLoading] = useState(true); */
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books/nyt-bestsellers')
      .then(response => {
        setBooks(response.data.results.books.slice(0, 5));
      })
      .catch(err => {
        setError('Failed to fetch books.');
      });
  }, []);

  /* if (loading) return <div>Loading...</div>; */
  if (error) return <div>{error}</div>;

  return (
    <div className="feature-section">
      <h2>New York Times Bestsellers</h2>
      <div className="books-list">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <img src={book.book_image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
            <p>Rank: {book.rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
