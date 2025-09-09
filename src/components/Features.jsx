import React from "react";
import portfolio from "../assets/portfolio.png";

export default function Features() {
  return (
    <section id="Features">
      <div className="flex flex-col items-center justify-center p-10 rounded-2xl shadow-lg text-center relative z-10 mb-10 overflow-hidden" style={{ background: "#0a0a23" }}>
        <h1 className="text-2xl text-center mb-10 font-bold text-white text-5xl mt-10">
          Features
        </h1>
        <figure>
          <img src={portfolio} alt="Portfolio" />
        </figure>
      </div>
    </section>
  );
}
