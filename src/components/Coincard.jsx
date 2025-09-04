import React, { useEffect, useState } from "react";

export default function Coincard() {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/listings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Add this line
        setCoinData(data.data); // CoinMarketCap API returns { data: [...] }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-zinc-900 rounded-2xl shadow-lg p-6 text-white z-10 relative mb-10">
      <div className="flex justify-between mb-4">
        <div className="text-[24px] font-bold">Popular</div>
        <div className="coin-search">Search More Crypto...</div>
      </div>
      <div className="coins">
        {coinData && coinData.length > 0 ? (
          coinData.slice(0, 5).map((coin) => (
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
