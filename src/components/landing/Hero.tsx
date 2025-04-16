
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Globe, Headset } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-pattern"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-meta-teal/20 blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-meta-purple/20 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto px-4 pt-20 pb-32 sm:pt-32 sm:pb-40 flex flex-col items-center text-center">
        <div className="mb-4 flex items-center justify-center px-4 py-2 rounded-full bg-meta-dark-blue/60 backdrop-blur border border-meta-teal/30 animate-fade-in">
          <span className="mr-2 text-meta-teal font-semibold">Introducing</span>
          <span className="text-white">The future of broadcasting</span>
        </div>
        
        {/* Logo Image */}
        <div className="mb-6 animate-fade-in">
          <img 
            src="/lovable-uploads/d9e95c26-442b-4d04-b224-4cf3e84ae483.png" 
            alt="MetaStream Logo" 
            className="h-24 md:h-32 w-auto mx-auto"
          />
        </div>

        <p className="text-xl md:text-2xl max-w-3xl text-gray-300 mb-10 animate-fade-in [animation-delay:200ms]">
          The next-gen broadcast software powered by AI and virtual reality. Stream from any device to any platform with unparalleled quality and features.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in [animation-delay:400ms]">
          <Link to="/dashboard">
            <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110 px-8 py-6 text-lg flex items-center gap-2 border-glow transition-all hover:shadow-lg shadow-meta-teal/50">
              Launch App
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="outline" className="px-8 py-6 text-lg border-meta-teal/50 hover:bg-meta-teal/10">
            Watch Demo
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-8 animate-fade-in [animation-delay:600ms]">
          <div className="flex items-center">
            <Cpu className="text-meta-teal mr-2 h-6 w-6" />
            <span className="text-gray-300">AI-Powered Production</span>
          </div>
          <div className="flex items-center">
            <Headset className="text-meta-teal mr-2 h-6 w-6" />
            <span className="text-gray-300">VR Broadcasting</span>
          </div>
          <div className="flex items-center">
            <Globe className="text-meta-teal mr-2 h-6 w-6" />
            <span className="text-gray-300">Multi-Platform Streaming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
