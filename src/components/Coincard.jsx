import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Coincard({ title, coins = [] }) {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    if (coins && coins.length > 0) {
      setCoinData(coins);
    } else {
      fetch("http://localhost:3001/api/listings")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data); // Add this line
          setCoinData(data.data); // CoinMarketCap API returns { data: [...] }
        })
        .catch((err) => console.error(err));
    }
  }, [coins]);

  function getNew(coins) {
    if (!Array.isArray(coins)) return [];
    return [...coins]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-zinc-900 rounded-2xl shadow-lg p-6 text-white z-10 relative mb-10">
      <div className="flex justify-between space mb-4">
        <div className="text-[24px] font-bold">{title}</div>
        <Link to="/search">
          <div className="coin-search">Search More Crypto...</div>
        </Link>
      </div>
      <div className="coins">
        {coinData && coinData.length > 0 ? (
          getNew(coinData).map((coin) => (
            <div className="flex justify-between items-center py-2 border-b border-zinc-800" key={coin.id}>
              <div className="coin_logo">
                <img src={coin.logo} alt={coin.name} className="w-6 h-6" />
              </div>
              <div className="coin-name">{coin.symbol}</div>
              <div className="coin-price">
                {coin.quote.USD.price.toFixed(2)}
              </div>
              <div className="coin-growth">
                {coin.quote.USD.percent_change_24h.toFixed(2)}%
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

