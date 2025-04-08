
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-meta-slate border-t border-meta-teal/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-meta-teal">MetaStream.AI</h3>
            <p className="text-gray-400 mb-4">The next generation of broadcast software with VR and AI integration.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Features</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Pricing</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Integrations</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Documentation</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Tutorials</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Support</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">About</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Blog</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-meta-teal/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2025 MetaStream.AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Terms</Link>
            <Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Privacy</Link>
            <Link to="#" className="text-gray-400 hover:text-meta-teal transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
