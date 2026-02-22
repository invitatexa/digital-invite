"use client";

import React from 'react';
import { Check, Star, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: "Standard",
      price: "499",
      desc: "Perfect for casual celebrations and small gatherings.",
      features: [
        "High Resolution JPG/PNG",
        "Unlimited Updates",
        "Lifetime Access",
        "Standard Templates Selection",
        "Single Event Management"
      ],
      cta: "Browse Collections",
      href: "/templates",
      premium: false
    },
    {
      name: "Elite",
      price: "999",
      desc: "Couture designs for your most significant life milestones.",
      features: [
        "Everything in Standard",
        "High-DPI Print-Ready PDF",
        "Premium Template Library",
        "Priority Support",
        "No Watermark on Previews",
        "Multiple Color Variants"
      ],
      cta: "Get Elite Access",
      href: "/templates",
      premium: true
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">Honest <span className="text-indigo-600">Pricing.</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">No subscriptions. No hidden fees. Just pay for the design you love and keep it forever.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-24">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative bg-white rounded-[3rem] p-12 border transition-all duration-500 hover:shadow-2xl ${plan.premium ? 'border-indigo-600 shadow-xl shadow-indigo-100' : 'border-gray-100 shadow-sm'}`}>
              {plan.premium && (
                <div className="absolute top-0 right-12 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Most Popular Choice
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-widest">{plan.name}</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">{plan.desc}</p>
              </div>

              <div className="flex items-baseline mb-10">
                <span className="text-xs font-black text-gray-400 mr-2 uppercase tracking-widest">Starts at</span>
                <span className="text-6xl font-black text-gray-900 tracking-tighter">₹{plan.price}</span>
                <span className="text-gray-400 font-medium ml-2">/ card</span>
              </div>

              <ul className="space-y-5 mb-12">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-gray-600 font-medium">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${plan.premium ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'}`}>
                        <Check size={14} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.href}
                className={`block w-full py-6 rounded-2xl font-black text-center text-lg transition transform hover:-translate-y-1 active:scale-95 shadow-xl ${plan.premium ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-gray-900 text-white shadow-gray-100'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-indigo-600 rounded-full opacity-20 filter blur-3xl"></div>
            <div className="relative z-10">
                <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter">Need something custom?</h2>
                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-medium">Our design team can craft a 100% unique boutique invitation just for you. Starting from ₹4,999.</p>
                <button className="bg-white text-gray-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition shadow-2xl">
                    Contact Studio
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
