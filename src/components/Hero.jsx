import { motion } from "framer-motion";
import { useState } from "react";
import NetworkMesh from "./NetworkMesh";
import Coincard from "./Coincard";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission here
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* animated gradient & glow layers */}
      <div className="absolute inset-0 gradient-animated opacity-90" />
      <div className="absolute inset-0 radial-glow z-0" />

      {/* particle mesh */}
      <NetworkMesh />

      {/* heading */}
      <div className="searchbar z-10 text-center">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="flex justify-center items-center text-8xl font-mono text-white drop-shadow-lg bg-black/40 px-8 py-4 rounded-lg w-fit mb-8">
            Search Crypto Now
          </h1>
          <form onSubmit={handleSearchSubmit} className="w-3/4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Crypto"
              className="w-full h-16 rounded-full bg-white text-gray-900 px-8 text-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-400"
            />
          </form>
        </div>
      </div>
      <div className="flex justify-around">
        <Coincard />
        <Coincard />
        <Coincard />
      </div>
    </section>
  );
}
