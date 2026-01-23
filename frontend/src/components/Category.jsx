import React from "react";

const CategorySection = () => {
  const categories = [
    {
      name: "Hardcover Fiction",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Paperback Fiction",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "E-book Fiction",
      image:
        "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Hardcover Non-fiction",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
   <section className="bg-[#FFF5E1] py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
          📚 Explore Book Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Image with gradient overlay */}
              <div className="h-56 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Text content */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white px-4">
                <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                <button className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium shadow hover:bg-gray-100 transition">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;
