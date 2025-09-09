import React from "react";
import data from "../assets/sample-news.json";
import bitcoin from "../assets/bitcoin.jpg";
import eth from "../assets/etherium.jpg";
import CFC from "../assets/CFC_img.jpg";
import metaplanet from "../assets/metaplanet.jpg";
import portfolio from "../assets/portfolio.png";
import Starfield from "./Starfield"; // <-- import the Starfield

export default function News() {
  const latestArticle = data[0];
  const images = [bitcoin, eth, CFC, metaplanet];

  return (
    <section
      id="features"
      className="features-section p-10 rounded-2xl shadow-lg text-center relative z-10 mb-10 overflow-hidden"
      style={{ background: "#0a0a23" }}
    >
      {/* Animated starfield background */}
      <Starfield />
      <div className="title relative z-10">
        <h2 className="text-2xl font-bold text-white text-5xl mt-10 mb-20">
          Crypto News
        </h2>
        <div className="news-articles grid grid-cols-3 gap-10 mt-4 w-full max-w-6xl mx-auto">
          {data.map((article, index) => (
            <div className="news-article" key={index}>
              <figure>
                <img
                  src={images[index]}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </figure>
              <h3 className="text-xl font-bold text-white">{article.title}</h3>
              <p className="text-gray-400">{article.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
