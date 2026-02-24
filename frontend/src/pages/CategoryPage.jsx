import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const validNYTCategories = [
  "hardcover-fiction",
  "paperback-fiction",
  "hardcover-nonfiction",
  "paperback-nonfiction",
  "young-adult-hardcover",
  "young-adult-paperback",
  "advice-how-to-and-miscellaneous",
  "business-books"
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSort, setSelectedSort] = useState("rank");

  const API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(false);
      if (!validNYTCategories.includes(categoryName)) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/${categoryName}.json?api-key=${API_KEY}`
        );
        const data = await response.json();
        setBooks(data.results.books);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [categoryName]);

  const formatCategoryName = (name) =>
    name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const sortedBooks = [...books].sort((a, b) => {
    if (selectedSort === "rank") return a.rank - b.rank;
    if (selectedSort === "weeks") return (b.weeks_on_list || 0) - (a.weeks_on_list || 0);
    if (selectedSort === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  if (loading)
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <h2 className="text-xl font-serif text-gray-700">Loading books...</h2>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6 opacity-50">📚</div>
          <h2 className="text-3xl font-serif mb-3">Category Not Found</h2>
          <p className="text-gray-600 mb-8">
            The category "{formatCategoryName(categoryName)}" doesn't exist in our collection.
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Header */}
      <header className="border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="text-xs uppercase tracking-widest text-gray-400 mb-6">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-3">/</span>
            <span className="text-black">Category</span>
          </nav>

          {/* Title */}
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-4">
              {formatCategoryName(categoryName)}
            </h1>
            <div className="w-16 h-0.5 bg-black/20 mb-6" />
          </div>

          {/* Sort Section */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <span className="text-xs uppercase tracking-widest text-gray-400">Sort by</span>
            <div className="flex gap-1">
              {["rank", "weeks", "title"].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSelectedSort(sort)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    selectedSort === sort 
                      ? "bg-black text-white" 
                      : "bg-white text-gray-600 hover:bg-black/5"
                  }`}
                >
                  {sort === "rank" && "Rank"}
                  {sort === "weeks" && "Longest on List"}
                  {sort === "title" && "Title"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {sortedBooks.map((book) => (
            <div
              key={book.primary_isbn13}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              <Link to={`/book/${book.primary_isbn13}`} state={{ book }}>
                <img
                  src={book.book_image}
                  alt={book.title}
                  className="w-full h-72 object-cover rounded mb-4"
                />
              </Link>
              <h3 className="text-lg font-serif font-bold mb-1 line-clamp-2">
                <Link to={`/book/${book.primary_isbn13}`} state={{ book }}>
                  {book.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              {book.publisher && <p className="text-xs text-gray-400">{book.publisher}</p>}
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4 opacity-30">📖</div>
            <h3 className="text-2xl font-serif mb-2">No books available</h3>
            <p className="text-gray-500 mb-8">This category is currently being updated.</p>
            <Link 
              to="/" 
              className="inline-block px-8 py-3 border border-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Browse other categories
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;