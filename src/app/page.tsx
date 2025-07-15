"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  // Confetti effect using canvas
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let confetti: any[] = [];
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        r: Math.random() * 6 + 4,
        d: Math.random() * 150 + 50,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      });
    }
    function draw() {
      if (!ctx) return; 
      ctx.clearRect(0, 0, W, H);
      confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
        ctx.stroke();
      });
      update();
    }
    function update() {
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        c.y += Math.cos(c.d) + 2 + c.r / 2;
        c.x += Math.sin(0.01 * c.d);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > H) {
          confetti[i] = {
            x: Math.random() * W,
            y: -10,
            r: c.r,
            d: c.d,
            color: c.color,
            tilt: c.tilt,
            tiltAngle: c.tiltAngle,
            tiltAngleIncremental: c.tiltAngleIncremental,
          };
        }
      }
    }
    let animationFrame;
    function animate() {
      draw();
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("resize", () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });
    return () => {
      cancelAnimationFrame(animationFrame);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-[#1a0033] dark:via-[#2d0036] dark:to-[#001a33] p-6">
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl text-center">
        <Image src="/next.svg" alt="Next.js" width={120} height={30} className="mb-2 dark:invert" />
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg animate-bounce">
          Happy Birthday, Shivansh Singh! 🎉
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 font-medium mt-2">
          Wishing you a day filled with joy, laughter, and all your favorite things.<br />
          May your year ahead be as amazing as you are!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="https://twitter.com/intent/tweet?text=Happy%20Birthday%20Shivansh%20Singh!%20%F0%9F%8E%89%20%23HappyBirthdayShivansh"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-lg hover:scale-105 transition-transform"
          >
            🎈 Wish Shivansh on Twitter
          </a>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-lg text-gray-500 dark:text-gray-400">Made with ❤️ using Next.js</span>
        </div>
      </div>
    </div>
  );
}

