
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, DollarSign } from "lucide-react";

const Cta = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-feature-gradient opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-meta-teal/10 blur-[100px]"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-glow">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-meta-teal to-meta-cyan">
              Ready to Transform Your Streams?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10">
            Join the broadcasting revolution with MetaStream.AI. Experience the future of content creation with AI-powered tools and seamless VR integration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Starter Plan */}
            <div className="bg-meta-dark-blue/60 backdrop-blur border border-meta-teal/20 rounded-lg p-6 transition-all hover:border-meta-teal/50 hover:translate-y-[-5px]">
              <div className="flex justify-center mb-4">
                <span className="p-3 rounded-full bg-meta-teal/10 text-meta-teal">
                  <DollarSign size={24} />
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <div className="text-3xl font-bold text-meta-teal mb-1">$9.99</div>
              <p className="text-gray-400 text-sm mb-4">per month</p>
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li>Basic AI scene management</li>
                <li>720p streaming quality</li>
                <li>2 custom stream templates</li>
                <li>Community support</li>
              </ul>
              <Link to="/pricing" className="block text-meta-teal hover:underline text-sm">
                Learn More
              </Link>
            </div>
            
            {/* Professional Plan */}
            <div className="bg-meta-dark-blue/60 backdrop-blur border border-meta-teal/30 rounded-lg p-6 transform scale-105 shadow-lg shadow-meta-teal/10 relative">
              <div className="absolute top-0 right-0 bg-meta-teal text-meta-dark-blue text-xs font-semibold px-3 py-1 rounded-bl-lg">
                Popular
              </div>
              <div className="flex justify-center mb-4">
                <span className="p-3 rounded-full bg-meta-teal/20 text-meta-teal">
                  <DollarSign size={24} />
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
              <div className="text-3xl font-bold text-meta-teal mb-1">$19.99</div>
              <p className="text-gray-400 text-sm mb-4">per month</p>
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li>Advanced AI scene optimization</li>
                <li>1080p streaming quality</li>
                <li>10 custom stream templates</li>
                <li>Priority email support</li>
              </ul>
              <Link to="/pricing" className="block text-meta-teal hover:underline text-sm">
                Learn More
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-meta-dark-blue/60 backdrop-blur border border-meta-teal/20 rounded-lg p-6 transition-all hover:border-meta-teal/50 hover:translate-y-[-5px]">
              <div className="flex justify-center mb-4">
                <span className="p-3 rounded-full bg-meta-teal/10 text-meta-teal">
                  <DollarSign size={24} />
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-meta-teal mb-1">$29.99</div>
              <p className="text-gray-400 text-sm mb-4">per month</p>
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li>Premium AI-powered tools</li>
                <li>4K streaming quality</li>
                <li>Unlimited custom templates</li>
                <li>24/7 dedicated support</li>
              </ul>
              <Link to="/pricing" className="block text-meta-teal hover:underline text-sm">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110 px-8 py-6 text-lg flex items-center gap-2 border-glow transition-all">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="px-8 py-6 text-lg border-meta-teal/50 hover:bg-meta-teal/10">
                View All Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
