import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
        setLoading(false);
      });
  }, []);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search by name, city, or address
  const filteredSchools = schools.filter((school) =>
    [school.name, school.city, school.address].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* Search Bar */}
      <div className="mt-4 mb-4 w-full max-w-md">
        <motion.input
          type="text"
          placeholder="🔍 Search schools by name, city, or address..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6 w-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 shadow-lg overflow-hidden bg-zinc-800 animate-pulse h-64"
            />
          ))}
        </div>
      ) : filteredSchools.length === 0 ? (
        <p className="text-gray-400 text-lg mt-6">No results found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6 w-full">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="border rounded-lg p-4 shadow-lg overflow-hidden transform hover:border-3 hover:border-blue-700 hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <div className="relative w-full h-45 rounded-t-2xl overflow-hidden bg-zinc-700">
                <Image
                  src={school.image}
                  alt={school.name}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-white hover:text-blue-700">
                  {school.name}
                </h2>
                <p className="text-gray-400 mt-1">
                  {school.address}, {school.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scroll to Top Button */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 h-16 bg-blue-700 bg-gradient-to-br from-blue via-zinc-900 to-blue text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110"
        >
          <FaArrowUp size={30} />
        </button>
      )}

      <Footer/>
    </div>
  );
}
