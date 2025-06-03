'use client';
import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Steps from '@/components/Steps';
import Contact from '@/components/Contact';
import Particles from '@/components/Particles';

export default function Home() {
    return (
        <>
            <Head>
                <title>SubletMatcher.club - Smart Sublease Matching Platform | Find Your Perfect Space</title>
                <meta name="description" content="SubletMatcher.club is a professional sublease matching platform using AI algorithms to find your ideal housing combination. Quickly find Studio, 1B1B, 2B2B, and more." />
                <meta name="keywords" content="sublease,sublet,housing match,smart housing,SubletMatcher,student housing" />
                <meta property="og:title" content="SubletMatcher.club - Smart Sublease Matching Platform" />
                <meta property="og:description" content="AI-powered algorithms match the best sublease combinations, making housing search simple and efficient" />
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


