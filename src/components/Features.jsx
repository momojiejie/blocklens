import React from "react";

export default function Features() {
  return (
    <section id="features" className="features-section p-10 rounded-2xl shadow-lg text-center relative z-10 mb-10">
      <div className="title">
        <h2 className="text-2xl font-bold text-white text-5xl mt-10">Features</h2>
        <div className="grid grid-cols-2 gap-16 mt-8">
        <div className="features-left">
          <div className="text-5xl font-bold text-white">Crypto News:</div>
          <div className="features-description">Stay updated with the latest news in the cryptocurrency world.</div>
          <div className="news-article">
            <h3 className="text-xl font-bold text-white">Latest Article Title</h3>
            <p className="text-gray-400">Summary of the latest article goes here.</p>
          </div>
        </div>
        <div className="features-right">
          <div className="text-5xl font-bold text-white">Portfolio Tracker:</div>
          <div className="text-gray-400">Monitor your crypto investments in real-time.</div>
        </div>
        </div>
      </div>
    </section>
  );
}
