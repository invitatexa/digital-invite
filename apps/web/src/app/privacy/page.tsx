"use client";

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-black text-gray-900 mb-12 tracking-tighter">Privacy <span className="text-indigo-600">Policy</span></h1>
        
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 prose prose-indigo max-w-none">
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-10">Last Updated: February 2026</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">1. Information We Collect</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            We collect information you provide directly to us, such as when you create an account, purchase a template, or contact us for support. This includes your name, email address, and event details.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">2. How We Use Information</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you about your orders and promotional offers.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">3. Data Security</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access. However, no internet transmission is ever 100% secure.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">4. Sharing of Information</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            We do not sell your personal information. We may share information with third-party service providers (like payment processors) only as necessary to provide our services.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">5. Your Choices</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            You can access, update, or delete your account information at any time through your dashboard settings or by contacting us directly.
          </p>
        </div>
      </div>
    </div>
  );
}
