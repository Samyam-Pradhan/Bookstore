import React from "react";
import { FaBook, FaTabletAlt, FaBookOpen, FaUser, FaRocket, FaChild, FaMask, FaBookReader } from "react-icons/fa";

const CategorySection = () => {
  const categories = [
    { name: "Hardcover Fiction", icon: <FaBook size={40} /> },
    { name: "Paperback Fiction", icon: <FaBookOpen size={40} /> },
    { name: "E-book Fiction", icon: <FaTabletAlt size={40} /> },
    { name: "Hardcover Non-fiction", icon: <FaUser size={40} /> },
    { name: "Science Fiction", icon: <FaRocket size={40} /> },
    { name: "Children's Books", icon: <FaChild size={40} /> },
    { name: "Biographies", icon: <FaMask size={40} /> },
    { name: "Comics & Manga", icon: <FaBookReader size={40} /> },
  ];

  return (
    <section className="bg-[#FFF5E1] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
          📚 Explore Book Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="text-[#000000] mb-4">{category.icon}</div>
              <h3 className="text-center font-bold text-lg">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;