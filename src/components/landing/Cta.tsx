
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110 px-8 py-6 text-lg flex items-center gap-2 border-glow transition-all">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" className="px-8 py-6 text-lg border-meta-teal/50 hover:bg-meta-teal/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
