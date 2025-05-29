
// components/Hero.js
import { useState, useEffect } from 'react';
import SearchContainer from './SearchContainer';

export default function Hero() {
    return (
        <section className="hero">
            <h1>智能算法 · 高效找房</h1>
            <p>输入你的需求，我们为你匹配最优短租组合</p>
            <SearchContainer />

            <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          padding: 40px 20px;
          position: relative;
          z-index: 5;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 1s ease-out 0.3s forwards;
          background: linear-gradient(45deg, #fff, #a8edea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 1s ease-out 0.6s forwards;
          color: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 768px) {
          .hero {
            padding: 20px 15px;
          }
        }
      `}</style>
        </section>
    );
}
