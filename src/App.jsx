import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import CTA from './components/CTA';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#111111] flex flex-col selection:bg-[#FF5A36] selection:text-white font-sans">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 2. Hero & Scroll Animation Section */}
        <Hero />

        {/* 3. Impact Statistics Section */}
        <Stats />

        {/* 4. Final CTA Section */}
        <CTA />
      </main>
    </div>
  );
}
