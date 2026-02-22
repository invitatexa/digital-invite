"use client";

import React from 'react';
import { Heart, Shield, Zap, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">Our <span className="text-indigo-600">Vision</span></h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
            We believe that every celebration deserves a grand entrance. DigitalInvite was born out of a desire to merge traditional elegance with modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">Elevating Digital Stationery</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed font-medium">
              In a world that's increasingly digital, we noticed a gap in the quality of digital invitations. Most were generic, low-resolution, or lacked the "soul" of a physical card.
            </p>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed font-medium">
              Our team of professional designers and artists work tirelessly to create templates that aren't just cards—they're experiences. Every pixel is placed with purpose, ensuring your guests feel the significance of your special day from the moment they open their invite.
            </p>
            <div className="flex space-x-8">
                <div className="text-center">
                    <div className="text-4xl font-black text-indigo-600 mb-1">10k+</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Happy Users</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-black text-indigo-600 mb-1">500+</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Premium Designs</div>
                </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600/5 rounded-[4rem] -rotate-3 transform scale-105"></div>
            <img 
                src="https://images.unsplash.com/photo-1512418490979-92798ccc1340?q=80&w=800" 
                className="relative rounded-[3rem] shadow-2xl"
                alt="Our Creative Studio"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-[4rem] p-16 md:p-24 text-center">
            <h2 className="text-4xl font-black text-gray-900 mb-12 uppercase tracking-tighter">The DigitalInvite Promise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { icon: Sparkles, title: "Artistic Excellence", desc: "No templates made by AI. Every design is hand-crafted by professional artists." },
                    { icon: Shield, title: "Permanent Access", desc: "Your purchases are yours forever. Re-download and re-edit anytime." },
                    { icon: Zap, title: "Instant Delivery", desc: "From payment to PDF in under 60 seconds. Modern speed for modern events." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <item.icon size={24} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-4">{item.title}</h3>
                        <p className="text-gray-400 font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
