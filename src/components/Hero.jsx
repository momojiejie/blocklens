import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NetworkMesh from "./NetworkMesh";
import Coincard from "./Coincard";

function getNew(coins) {
  if (!Array.isArray(coins)) return [];
  return [...coins]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
}

function getPopular(coins) {
  if (!Array.isArray(coins)) return [];
  return [...coins]
    .sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap)
    .slice(0, 5);
}

function getTopGainers(coins) {
  if (!Array.isArray(coins)) return [];
  return [...coins]
    .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
    .slice(0, 5);
}

export default function Hero({ coins = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popular = getPopular(coins);
  const newCoins = getNew(coins);
  const topGainers = getTopGainers(coins);

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
          <form
            onSubmit={handleSearchSubmit}
            className="relative z-10 flex flex-col items-center w-3/4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Crypto"
              className="w-full max-w-4xl h-16 rounded-full bg-white text-gray-900 px-8 text-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-400"
            />
            <button
              type="submit"
              className="mt-5 px-6 py-2 border rounded bg-cyan-500 text-white font-bold"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex grid-col-3 gap-10 justify-center w-full max-w-6xl mx-auto px-6 text-white relative z-10">
        <Coincard title="Popular" coins={popular} />
        <Coincard title="New" coins={newCoins} />
        <Coincard title="Top Gainers" coins={topGainers} />
      </div>
      
    </section>
  );
}
