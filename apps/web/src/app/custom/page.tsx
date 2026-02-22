"use client";

import React from 'react';
import { Send, MapPin, Mail, Phone, Layout } from 'lucide-react';

export default function CustomWorkPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
                <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full mb-8 font-black text-[10px] uppercase tracking-widest">
                    Boutique Design Studio
                </div>
                <h1 className="text-6xl font-black text-gray-900 mb-8 tracking-tighter">Bespoke <span className="text-indigo-600">Creation.</span></h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                    Looking for something completely unique? Our master designers can create a one-of-a-kind invitation tailored specifically to your event's theme, color palette, and personality.
                </p>

                <div className="space-y-8">
                    <div className="flex items-start space-x-6">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">Email Us</h4>
                            <p className="text-gray-500 font-medium">studio@digitalinvite.com</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-6">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">WhatsApp Studio</h4>
                            <p className="text-gray-500 font-medium">+91 98765 43210</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2">
                <div className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
                    <h3 className="text-2xl font-black text-gray-900 mb-8">Tell us your vision</h3>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Your Name</label>
                                <input className="w-full bg-white border-2 border-transparent rounded-[1.25rem] p-4 focus:border-indigo-600 font-bold text-gray-700 shadow-sm transition outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Event Type</label>
                                <select className="w-full bg-white border-2 border-transparent rounded-[1.25rem] p-4 focus:border-indigo-600 font-bold text-gray-700 shadow-sm transition outline-none">
                                    <option>Wedding</option>
                                    <option>Corporate Gala</option>
                                    <option>Milestone Birthday</option>
                                    <option>Other Luxury Event</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                            <input className="w-full bg-white border-2 border-transparent rounded-[1.25rem] p-4 focus:border-indigo-600 font-bold text-gray-700 shadow-sm transition outline-none" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Brief Description</label>
                            <textarea rows={4} className="w-full bg-white border-2 border-transparent rounded-[1.25rem] p-4 focus:border-indigo-600 font-bold text-gray-700 shadow-sm transition outline-none" placeholder="Share some details about your theme or vision..."></textarea>
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 shadow-xl transition transform hover:-translate-y-1 active:scale-95">
                            <Send size={20} />
                            <span>Request Consultation</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
