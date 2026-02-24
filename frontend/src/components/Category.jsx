import React from "react";
import { Link } from "react-router-dom";
import { 
  FaBook, 
  FaTabletAlt, 
  FaBookOpen, 
  FaUser, 
  FaRocket, 
  FaChild, 
  FaMask, 
  FaBookReader 
} from "react-icons/fa";

const CategorySection = () => {
  const categories = [
    { name: "Hardcover Fiction", icon: <FaBook size={32} />, slug: "hardcover-fiction" },
    { name: "Paperback Fiction", icon: <FaBookOpen size={32} />, slug: "paperback-fiction" },
    { name: "E-book Fiction", icon: <FaTabletAlt size={32} />, slug: "e-book-fiction" },
    { name: "Hardcover Non-fiction", icon: <FaUser size={32} />, slug: "hardcover-nonfiction" },
    { name: "Science Fiction", icon: <FaRocket size={32} />, slug: "science-fiction" },
    { name: "Children's Books", icon: <FaChild size={32} />, slug: "childrens-books" },
    { name: "Biographies", icon: <FaMask size={32} />, slug: "biographies" },
    { name: "Comics & Manga", icon: <FaBookReader size={32} />, slug: "comics-and-manga" },
  ];

  return (
    <section className="bg-[#FFFAF1] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-black/20" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.slug}`}
              className="group block"
            >
              <div className="flex flex-col items-center justify-center p-8 bg-white border border-black/5 hover:border-black/20 transition-all duration-300">
                <div className="text-gray-700 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                  {category.icon}
                </div>
                <h3 className="font-serif text-base text-center text-gray-700 group-hover:text-gray-900 transition-colors">
                  {category.name}
                </h3>
                <span className="inline-block w-0 group-hover:w-6 h-px bg-black/20 mt-3 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;