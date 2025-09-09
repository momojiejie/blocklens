import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import News from "../components/News";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <News />
      <Features />
      <Footer />
    </div>
  );
}
