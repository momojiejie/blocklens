import React, { useRef, useEffect } from "react";

export default function Starfield({ numStars = 120 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Handle resize
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Star setup
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
      o: 0.2 + Math.random() * 0.8,
      r: 0.5 + Math.random() * 1.5,
      speed: 0.5 + Math.random() * 1.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let star of stars) {
        // Move star
        star.z -= star.speed;
        if (star.z <= 0) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
          star.z = width;
        }
        // Perspective projection
        const k = 128.0 / star.z;
        const sx = (star.x - width / 2) * k + width / 2;
        const sy = (star.y - height / 2) * k + height / 2;
        const sr = star.r * k;

        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${star.o})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [numStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", zIndex: 0 }}
    />
  );
}