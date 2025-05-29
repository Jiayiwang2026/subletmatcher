// components/Header.js
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">SubletMatcher 智能匹配找房</div>
                <nav className="main-nav">
                    <div className="nav-links">
                        <button onClick={() => scrollToSection('rental')} className="nav-item">长租房</button>
                        <button onClick={() => scrollToSection('furniture')} className="nav-item">家居帮手</button>
                        <button onClick={() => scrollToSection('storage')} className="nav-item">寄存/转运</button>
                        <button onClick={() => scrollToSection('news')} className="nav-item">News</button>
                        <button onClick={() => scrollToSection('publish')} className="nav-item">发布房源</button>
                    </div>
                    <div className="contact-wrapper">
                        <button onClick={() => scrollToSection('contact')} className="nav-item contact-tab">联系我们</button>
                    </div>
                </nav>
            </div>

            <style jsx>{`
        .header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 15px 20px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .main-nav {
          display: flex;
          gap: 30px;
          align-items: center;
          flex: 1;
          justify-content: flex-end;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .contact-wrapper {
          margin-left: auto;
          padding-left: 20px;
        }

        .nav-item {
          color: white;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .contact-tab {
          background: linear-gradient(45deg, #667eea, #764ba2);
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .contact-tab:hover {
          background: linear-gradient(45deg, #5a6fd8, #6a4190);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
          }
          
          .logo {
            font-size: 20px;
          }
          
          .main-nav {
            flex-direction: column;
            gap: 15px;
            width: 100%;
          }
          
          .nav-links {
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .contact-wrapper {
            margin-left: 0;
            padding-left: 0;
            margin-top: 10px;
          }
          
          .nav-item {
            font-size: 14px;
            padding: 8px 12px;
          }
        }
      `}</style>
        </header>
    );
}
