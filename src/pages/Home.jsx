import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import News from "../components/News";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/listings")
      .then((res) => res.json())
      .then((data) => setCoins(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <Hero coins={coins} /> {/* Pass coins as prop */}
      <News />
      <Features />
      <Footer />
    </div>
  );
}
