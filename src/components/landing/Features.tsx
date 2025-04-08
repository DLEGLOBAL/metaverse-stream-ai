
import React from 'react';
import { Bot, Camera, Headset, Layout, Shuffle, Wand2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: <Wand2 className="h-10 w-10" />,
    title: "AI Director",
    description: "Automatic camera switching based on voice, movement, and scene activity.",
  },
  {
    icon: <Camera className="h-10 w-10" />,
    title: "Smart Green Screen",
    description: "Real-time background removal without needing physical chroma key setup.",
  },
  {
    icon: <Headset className="h-10 w-10" />,
    title: "VR Integration",
    description: "Stream directly from Meta Quest, SteamVR, and other VR platforms seamlessly.",
  },
  {
    icon: <Bot className="h-10 w-10" />,
    title: "Voice Commands",
    description: "Control your stream hands-free with natural language voice commands.",
  },
  {
    icon: <Layout className="h-10 w-10" />,
    title: "Dynamic Layouts",
    description: "Content-aware scenes that automatically optimize based on what you're streaming.",
  },
  {
    icon: <Shuffle className="h-10 w-10" />,
    title: "Multi-Platform",
    description: "Stream to YouTube, Twitch, Facebook, and more simultaneously with custom settings.",
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-meta-dark-blue/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-meta-teal to-meta-cyan">
              Revolutionary Features
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            MetaStream.AI combines cutting-edge technology to give you the most advanced broadcasting experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card p-6 hover:border-meta-teal/40 transition-all hover:translate-y-[-5px] duration-300">
              <div className="mb-4 text-meta-teal">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
