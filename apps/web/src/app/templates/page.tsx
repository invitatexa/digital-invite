"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { ITemplate } from '@digital-invite/types';
import { Sparkles, Palette, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
// test
function TemplatesContent() {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get('/templates');
        setTemplates(res.data);
        
        if (eventId) {
            const eRes = await api.get(`/events/${eventId}`);
            setSelectedTemplateId(eRes.data.selectedTemplateId);
        }
      } catch (error) {
        console.error('Failed to fetch templates');
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [eventId]);

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="text-center mb-24 animate-reveal">
            {eventId ? (
                <div className="inline-flex items-center space-x-2 bg-green-50 text-green-600 border border-green-100 px-6 py-2 rounded-full mb-8 font-black text-[10px] uppercase tracking-[0.2em] shadow-sm">
                    <CheckCircle2 size={14} className="mr-1" />
                    <span>Step 2: Dressing Your Occasion</span>
                </div>
            ) : (
                <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 border border-indigo-100 px-6 py-2 rounded-full mb-8 font-black text-[10px] uppercase tracking-[0.2em] shadow-sm">
                    <Palette size={14} className="mr-1" />
                    <span>Couture Invitation Collections</span>
                </div>
            )}
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">Luxury is <span className="text-indigo-600">Personal.</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">Select a template that resonates with your vision. Every pixel is crafted for impact.</p>
        </header>

        {/* Categories Menu */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 animate-reveal" style={{ animationDelay: '0.1s' }}>
            {['All', 'Wedding', 'Birthday', 'Mundan'].map((cat) => (
                <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-10 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest transition duration-500 transform hover:-translate-y-1 ${activeCategory === cat ? 'bg-gray-900 text-white shadow-2xl shadow-gray-200 scale-105' : 'bg-white text-gray-400 hover:text-gray-900 border border-gray-100 shadow-sm'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-y-20 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-32 text-center">
                <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-6 text-gray-400 font-black uppercase text-xs tracking-widest italic">Curating display...</p>
            </div>
          ) : filteredTemplates.length > 0 ? (
            filteredTemplates.map((template: any) => (
              <div key={template._id} className="group animate-reveal">
                <div className="relative aspect-[1/1.4] w-full rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-2xl transition-all duration-700 hover:shadow-indigo-200/50 group-hover:-translate-y-4">
                  <img
                    src={template.previewUrl}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  
                  {/* Elite Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700 flex flex-col items-center justify-center p-12 opacity-0 group-hover:opacity-100">
                    <Link 
                        href={`/template/${template._id}?eventId=${eventId}`}
                        className="w-full bg-white text-gray-900 py-5 rounded-2xl font-black text-center shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition duration-700 flex items-center justify-center space-x-2"
                    >
                        <span>Personalize This</span>
                        <ArrowRight size={18} />
                    </Link>
                  </div>

                  <div className="absolute top-8 left-8 flex flex-col space-y-3">
                      <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {template.category}
                      </span>
                      {template.isPremium && (
                        <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center shadow-lg">
                            <Star size={10} className="mr-1 fill-white" /> Elite
                        </div>
                      )}
                      {selectedTemplateId === template._id && (
                        <div className="bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center shadow-lg">
                            <CheckCircle2 size={10} className="mr-1" /> Saved
                        </div>
                      )}
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-end px-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-indigo-600 transition">
                      {template.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{template.price}</p>
                    <div className="h-1.5 w-full bg-indigo-50 mt-1 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-1/4 transition-all duration-1000 group-hover:w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-40 text-center animate-reveal">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200 border border-gray-100">
                    <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">End of the line.</h3>
                <p className="text-gray-400 mt-2">No designs found matching your selection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-xl animate-pulse font-black text-gray-300 uppercase tracking-widest">Opening Gallery...</div>}>
            <TemplatesContent />
        </Suspense>
    );
}

