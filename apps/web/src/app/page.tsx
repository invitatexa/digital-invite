"use client";

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Download, Heart } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuthStore();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10" />
          <img 
            src="/landing_hero.png" 
            className="w-full h-full object-cover"
            alt="Premium Invitations"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-6">
                <Sparkles className="text-indigo-400 w-4 h-4" />
                <span className="text-indigo-300 text-xs font-black uppercase tracking-widest">Premium Digital Stationery</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-6">
                Crafting <span className="text-indigo-400">Luxury</span> Moments.
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed font-medium">
                Designing sophisticated, high-end digital invitation cards for your most meaningful celebrations. Instant fulfillment, unlimited downloads, and world-class design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={user ? "/dashboard" : "/register"}
                className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 shadow-2xl shadow-indigo-500/20 flex items-center justify-center space-x-3"
              >
                <span>{user ? "Go to Dashboard" : "Start Designing Free"}</span>
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/templates"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition text-center"
              >
                Explore Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
                <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Why Choose DigitalInvite?</h2>
                <div className="h-2 w-24 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { icon: ShieldCheck, title: "Premium Designs", desc: "Curated by professional artists to ensure every card feels like a masterpiece." },
                    { icon: Zap, title: "Instant Fulfillment", desc: "Pay and download your high-resolution card in seconds. No waiting days." },
                    { icon: Download, title: "Unlimited Access", desc: "Download as many times as you like. Permanent access to your purchased cards." }
                ].map((feature, idx) => (
                    <div key={idx} className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                            <feature.icon size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                        <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Categories / Showcase Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="max-w-xl">
                    <h2 className="text-5xl font-black text-gray-900 leading-tight">Templates for <span className="text-indigo-600 italic">Every</span> Occasion.</h2>
                </div>
                <Link href="/templates" className="text-indigo-600 font-black flex items-center space-x-2 border-b-4 border-indigo-600 pb-2 hover:text-indigo-800 transition">
                    <span>View All Collections</span>
                    <ArrowRight size={20} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Weddings", count: "40+ Designs", img: "https://images.unsplash.com/photo-1595814521369-15d787796d8f?auto=format&fit=crop&q=80&w=400" },
                    { title: "Birthdays", count: "25+ Designs", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400" },
                    { title: "Ceremonies", count: "15+ Designs", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400" }
                ].map((cat, idx) => (
                    <div key={idx} className="relative h-[500px] rounded-[3rem] overflow-hidden group cursor-pointer shadow-xl">
                        <img src={cat.img} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                            <p className="text-indigo-400 font-black uppercase text-xs tracking-[0.2em] mb-2">{cat.count}</p>
                            <h3 className="text-4xl font-black text-white">{cat.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-indigo-500 rounded-full opacity-50 filter blur-3xl"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Invite in Style?</h2>
                <p className="text-indigo-100 text-lg mb-12 font-medium">Join over 10,000 satisfied users creating stunning memories today.</p>
                <Link href="/register" className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition shadow-2xl">
                    Create Your Account
                </Link>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-2xl font-black text-indigo-600 mb-6">DigitalInvite</h3>
                    <p className="text-gray-400 max-w-xs mx-auto md:mx-0 font-medium">Elevating digital celebrations through exceptional design and seamless technology.</p>
                </div>
                <div>
                    <h4 className="text-gray-900 font-black uppercase text-xs tracking-widest mb-6">Product</h4>
                    <ul className="space-y-4 text-gray-500 font-medium">
                        <li><Link href="/templates" className="hover:text-indigo-600">Templates</Link></li>
                        <li><Link href="/pricing" className="hover:text-indigo-600">Pricing</Link></li>
                        <li><Link href="/custom" className="hover:text-indigo-600">Custom Work</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-900 font-black uppercase text-xs tracking-widest mb-6">Company</h4>
                    <ul className="space-y-4 text-gray-500 font-medium">
                        <li><Link href="/about" className="hover:text-indigo-600">About Us</Link></li>
                        <li><Link href="/privacy" className="hover:text-indigo-600">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-12 gap-6">
                <p className="text-gray-400 text-sm font-bold">© 2026 DigitalInvite Platform. Made with <Heart className="inline text-red-500 w-4 h-4" /> globally.</p>
                <div className="flex space-x-6">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
