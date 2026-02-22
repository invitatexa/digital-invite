"use client";

import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-black text-gray-900 mb-12 tracking-tighter">Terms of <span className="text-indigo-600">Service</span></h1>
        
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 prose prose-indigo max-w-none">
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-10">Last Updated: February 2026</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">1. Acceptance of Terms</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            By accessing and using DigitalInvite, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">2. Digital Products</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            Our products are digital in nature. Once a purchase is confirmed and the product is delivered via download or email, we generally do not offer refunds unless the product is technically defective.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">3. License & Usage</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            Purchasing a template grants you a personal, non-exclusive license to use the design for your specific event. You may not resell, redistribute, or use the designs for commercial purposes without explicit permission.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">4. User Content</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            You are responsible for the content you input into our templates. You must ensure you have the rights to any images or text you upload. We reserve the right to remove any content that violates our community standards.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">5. Limitation of Liability</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            DigitalInvite shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services.
          </p>
        </div>
      </div>
    </div>
  );
}
