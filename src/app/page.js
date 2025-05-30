'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Home from './components/home'; // 注意文件名大小写

export default function HomePage() {
    return (
        <div>
            <Header />
            <Hero />
            <Home />
        </div>
    );
}