'use client';
import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Steps from '@/components/Steps';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Particles from '@/components/Particles';

export default function Home() {
    return (
        <>
            <Head>
                <title>SubletMatcher.club - 智能短租匹配平台 | 高效找房神器</title>
                <meta name="description" content="SubletMatcher.club是专业的短租匹配平台，使用AI智能算法为您匹配最优房源组合。快速找到Studio、1B1B、2B2B等各类短租房源。" />
                <meta name="keywords" content="短租,转租,房源匹配,智能找房,SubletMatcher,学生公寓" />
                <meta property="og:title" content="SubletMatcher.club - 智能短租匹配平台" />
                <meta property="og:description" content="AI智能算法匹配最优短租组合，让找房变得简单高效" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://subletmatcher.club" />
                <link rel="canonical" href="https://subletmatcher.club" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="app">
                <Particles />
                <Header />
                <Hero />
                <Steps />
                <Services />
                <Contact />
            </div>

            <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #333;
          overflow-x: hidden;
        }

        .app {
          position: relative;
          min-height: 100vh;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}



// components/Steps.js


