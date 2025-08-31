/* eslint-disable @next/next/no-img-element */
// pages/index.js
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      
      {/* Floating Illustration */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
        className="mb-10"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="School Illustration"
          className="w-32 h-32 drop-shadow-lg"
        />
      </motion.div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
        School Management System 
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-300 mb-12">
        Manage schools efficiently with a clean & modern interface
      </p>

      {/* Buttons Section */}
      <div className="flex gap-8">
        <Link
          href="/addSchool"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-blue-500/50 transition-transform duration-300"
        >
          ➕ Add School
        </Link>

        <Link
          href="/showSchools"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-green-500/50 transition-transform duration-300"
        >
          📚 Show Schools
        </Link>
      </div>
       {/* Footer */}
      <Footer/>
    </div>
  );
}
