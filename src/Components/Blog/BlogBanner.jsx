import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import banner from "../../assets/blog.jpg";
import blog1 from "../../assets/gold1.webp";
import blog2 from "../../assets/footer.webp";
import blog3 from "../../assets/gold3.webp";
import blog4 from "../../assets/gold4.webp";
import { Link } from "react-router-dom";

const BlogBanner = () => {
  const blogs = [
    {
      id: 1,
      name: "The Timeless Beauty of Gold Jewelry",
      date: "2025-09-01",
      blog: "Gold jewelry has been cherished for centuries as a symbol of wealth, beauty, and tradition. From ancient civilizations to modern fashion, gold remains unmatched in elegance. In this blog, we explore why gold is still the number one choice for weddings, festivals, and everyday wear.",
      writer: "Tannous Jewelry",
      image: blog1,
    },
    {
      id: 2,
      name: "How to Choose the Perfect Gold Necklace",
      date: "2025-09-03",
      blog: "Selecting a gold necklace can be tricky, especially with so many designs and purity levels available. This guide helps you understand karats, weight, and styles so you can pick the perfect necklace that matches your personality and occasion.",
      writer: "Tannous Jewelry",
      image: blog2,
    },
    {
      id: 3,
      name: "Why Gold is the Best Investment in 2025",
      date: "2025-09-05",
      blog: "Beyond beauty, gold is one of the safest investments in the world. In 2025, with market uncertainty, gold continues to shine as a secure asset. We explain why buying gold jewelry or coins is a smart choice for your financial future.",
      writer: "Tannous Jewelry",
      image: blog3,
    },
    {
      id: 4,
      name: "Caring for Your Gold Jewelry",
      date: "2025-09-07",
      blog: "Gold is durable but still requires care to maintain its shine. Learn the best tips for cleaning, storing, and protecting your gold jewelry so it lasts a lifetime without losing its brilliance.",
      writer: "Tannous Jewelry",
      image: blog4,
    },
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left Blog Cards */}
      <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white  overflow-hidden transition-transform duration-300  hover:-translate-y-1"
          >
            <img
              src={blog.image}
              alt={blog.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <div className="flex items-center text-sm text-[#191919] mb-2">
                <span className="flex items-center mr-3">
                  <FaUser className="mr-1" /> {blog.writer}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" /> {blog.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-[#191919]">
                {blog.name}
              </h3>
              <p className="text-gray-700 text-sm mb-6">
                {blog.blog.substring(0, 80)}...
              </p>

              <button className="">
                <Link to={"/collection"} className="px-4 py-2 border border-gray-800 text-gray-800 font-medium text-sm hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center">
                  View Collection <FaArrowRight className="ml-2" />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Banner */}
      <div className="lg:w-1/2 relative flex items-center justify-center  overflow-hidden">
        <img
          src={banner}
          alt="Gold Banner"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white p-8 max-w-md">
          <h2 className="text-6xl font-serif mb-2 italic">Arrabic Style</h2>
          <p className="text-3xl font-light mb-8 italic">Antique Jewellery</p>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300">
            VIEW COLLECTION
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
