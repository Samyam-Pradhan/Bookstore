import hero3 from "../images/hero3.jpg";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find your next <span className="text-indigo-600">favourite book</span>
          </h1>

          <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition">
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={hero3}
            alt="Books"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
