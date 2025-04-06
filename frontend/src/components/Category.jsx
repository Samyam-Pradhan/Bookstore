import React from 'react';
import "../styles/Category.css";
const CategorySection = () => {
  const categories = [
    {
      name: 'Hardcover Fiction',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Paperback Fiction',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'E-book Fiction',
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Hardcover Non-fiction',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=800&auto=format&fit=crop'
    },

  ];

  return (
    <div className="category-section">
      <h2>Book Categories</h2>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;