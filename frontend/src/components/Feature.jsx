import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Feature = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  // Replace with your NYT API key
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`)
      .then(response => {
        setBooks(response.data.results.books.slice(0, 5));
      })
      .catch(err => {
        setError('Failed to fetch books.');
      });
  }, []);

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