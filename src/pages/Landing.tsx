
import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Cta from '@/components/landing/Cta';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-meta-slate">
      <Hero />
      <Features />
      <Cta />
      <Footer />
    </div>
  );
};

export default Landing;
