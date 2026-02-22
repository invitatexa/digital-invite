"use client";

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ITemplate, IEvent } from '@digital-invite/types';
import { Palette, Type, Save, CheckCircle2, RotateCcw, Download, Sparkles, Layout, ChevronLeft } from 'lucide-react';

function TemplatePreviewContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get('eventId');
  
  const [template, setTemplate] = useState<ITemplate | null>(null);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [previewKey, setPreviewKey] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Local state for live editing
  const [localEventData, setLocalEventData] = useState<any>({});
  const [localCustomizations, setLocalCustomizations] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, eRes, pRes] = await Promise.all([
          api.get(`/templates/${id}`),
          eventId ? api.get(`/events/${eventId}`) : Promise.resolve({ data: null }),
          eventId ? api.get(`/users/check-purchase/${id}/${eventId}`) : Promise.resolve({ data: { purchased: false } })
        ]);
        
        setTemplate(tRes.data);
        setEvent(eRes.data);
        setIsPurchased(pRes.data.purchased);
        setDownloadUrl(pRes.data.downloadUrl);

        if (eRes.data) {
          setLocalEventData(eRes.data.eventData);
          setLocalCustomizations(eRes.data.customizations || {});
        }
      } catch (error) {
        console.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, eventId]);

  const handleUpdate = async (silent = false) => {
    if (!eventId) return;
    if (!silent) setIsSaving(true);
    try {
      await api.put(`/events/${eventId}`, {
        eventData: localEventData,
        customizations: localCustomizations,
        selectedTemplateId: id
      });
      setPreviewKey(prev => prev + 1);
      if (!silent) alert('Design saved to your event successfully!');
    } catch (error) {
      if (!silent) alert('Failed to save changes');
    } finally {
        if (!silent) setIsSaving(false);
    }
  };

  const handleCheckout = async () => {
    try {
      // Final save before checkout
      await handleUpdate(true);
      
      const res = await api.post('/orders/create', { templateId: id, eventId });
      const { razorpayOrderId, amount, currency } = res.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Digital Invite",
        description: `Purchase ${template?.title}`,
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          await api.post('/orders/verify', response);
          alert('Payment successful! Your invite is being generated.');
          window.location.href = '/orders';
        },
        theme: { color: "#4F46E5" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Checkout failed');
    }
  };

  if (loading) return <div className="p-12 text-center text-xl animate-pulse font-black text-gray-300 uppercase tracking-widest">Entering Creative Studio...</div>;
  if (!template) return <div className="p-12 text-center text-xl text-red-500">Template not found</div>;

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
            <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition font-black text-xs uppercase tracking-widest bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                <ChevronLeft size={16} />
                <span>Back to Gallery</span>
            </button>
            <div className="flex items-center space-x-2">
                <Layout className="text-indigo-600" size={20} />
                <span className="font-black text-gray-900 uppercase tracking-widest text-sm">Design Suite v2.0</span>
            </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Left Side: Real-Time Editor Toolbar */}
          <div className="w-full xl:w-[450px] space-y-6">
            <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-50">
                    <button 
                        onClick={() => setActiveTab('content')}
                        className={`flex-1 py-6 flex items-center justify-center space-x-2 font-black text-[10px] uppercase tracking-[0.2em] transition ${activeTab === 'content' ? 'text-indigo-600 border-b-4 border-indigo-600 bg-indigo-50/10' : 'text-gray-300'}`}
                    >
                        <Type size={16} />
                        <span>Language</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('style')}
                        className={`flex-1 py-6 flex items-center justify-center space-x-2 font-black text-[10px] uppercase tracking-[0.2em] transition ${activeTab === 'style' ? 'text-indigo-600 border-b-4 border-indigo-600 bg-indigo-50/10' : 'text-gray-300'}`}
                    >
                        <Palette size={16} />
                        <span>Style</span>
                    </button>
                </div>

                <div className="p-10 max-h-[600px] overflow-y-auto custom-scrollbar bg-gray-50/30">
                    {activeTab === 'content' ? (
                        <div className="space-y-6">
                            {Object.keys(localEventData).map((key) => (
                                <div key={key}>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 opacity-60">{key.replace(/([A-Z])/g, ' $1')}</label>
                                    <input 
                                        type="text"
                                        value={localEventData[key]}
                                        onChange={(e) => setLocalEventData({...localEventData, [key]: e.target.value})}
                                        className="w-full bg-white border-2 border-transparent rounded-[1.25rem] p-4 focus:border-indigo-600 font-bold text-gray-700 shadow-sm transition outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-10">
                            <div>
                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center">
                                    <div className="w-1 h-4 bg-indigo-600 mr-3 rounded-full"></div>
                                    Palette Selection
                                </label>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: 'Primary', key: 'primaryColor', default: '#4F46E5' },
                                        { label: 'Secondary', key: 'secondaryColor', default: '#F59E0B' },
                                        { label: 'Text', key: 'textColor', default: '#111827' },
                                        { label: 'Accent', key: 'accentColor', default: '#10B981' }
                                    ].map((c) => (
                                        <div key={c.key}>
                                            <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-1 ml-2 opacity-60">{c.label}</label>
                                            <div className="relative h-16 rounded-[1.25rem] overflow-hidden shadow-sm border border-gray-100 p-1 bg-white">
                                                <input 
                                                    type="color" 
                                                    value={localCustomizations[c.key] || c.default}
                                                    onChange={(e) => setLocalCustomizations({...localCustomizations, [c.key]: e.target.value})}
                                                    className="w-full h-full rounded-xl border-none cursor-pointer bg-transparent"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center">
                                    <div className="w-1 h-4 bg-indigo-600 mr-3 rounded-full"></div>
                                    Visual Mix
                                </label>
                                <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Opacity</span>
                                        <span className="text-xs font-black text-indigo-600">{Math.round((localCustomizations.bgOpacity || 1) * 100)}%</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" max="1" step="0.1"
                                        value={localCustomizations.bgOpacity || 1}
                                        onChange={(e) => setLocalCustomizations({...localCustomizations, bgOpacity: e.target.value})}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 bg-white border-t border-gray-50 flex items-center space-x-4">
                    <button 
                        onClick={() => handleUpdate()}
                        disabled={isSaving}
                        className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-black transition transform active:scale-95 disabled:opacity-50 shadow-xl shadow-gray-100"
                    >
                        {isSaving ? <RotateCcw className="animate-spin" size={16} /> : <Save size={16} />}
                        <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
                    </button>
                    <button 
                        onClick={() => {
                            setPreviewKey(prev => prev + 1);
                            handleUpdate(true);
                        }}
                        className="p-5 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition shadow-sm"
                        title="Reload Canvas"
                    >
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>

            {/* Final Action Card */}
            <div className="bg-indigo-600 p-10 rounded-[3rem] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition duration-[2s]"></div>
                
                <div className="mb-8 relative z-10">
                    <h3 className="text-xs font-black text-indigo-200 uppercase tracking-[0.2em] mb-3">Project Finalization</h3>
                    <h2 className="text-3xl font-black">{template.title}</h2>
                </div>
                
                <div className="flex items-baseline space-x-3 mb-10 relative z-10">
                    <span className="text-5xl font-black tracking-tighter">₹{template.price}</span>
                    <span className="text-indigo-200 line-through text-lg font-bold">₹{template.price + 500}</span>
                </div>

                {isPurchased ? (
                    <div className="space-y-4 relative z-10">
                        <a 
                            href={downloadUrl || '#'} 
                            target="_blank"
                            className="w-full bg-white text-indigo-600 py-6 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 shadow-xl transition transform hover:-translate-y-1 active:scale-95"
                        >
                            <Download size={24} />
                            <span>Download Invite</span>
                        </a>
                        <p className="text-center text-[10px] font-black text-indigo-100 uppercase tracking-widest">You have already purchased this design.</p>
                    </div>
                ) : (
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-white text-indigo-600 py-6 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 shadow-xl transition transform hover:-translate-y-1 active:scale-95 relative z-10"
                    >
                      <CheckCircle2 size={24} />
                      <span>Unlock Design</span>
                    </button>
                )}
                <p className="mt-6 text-center text-[10px] text-indigo-200 font-bold uppercase tracking-widest">High-DPI 300 PDF Post-Unlock</p>
            </div>
          </div>

          {/* Right Side: Elite IFrame Preview Workspace */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 border-4 border-[#fcfcfc] flex items-center justify-center text-indigo-600 font-black text-xs shadow-sm">HQ</div>
                        <div className="w-10 h-10 rounded-full bg-gray-900 border-4 border-[#fcfcfc] flex items-center justify-center text-white font-black text-xs shadow-sm">PDF</div>
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 uppercase tracking-widest text-sm leading-none">Studio Canvas</h2>
                        <span className="text-[10px] font-bold text-gray-400">1000px × 1400px • CMYK Color Space</span>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">Live Engine Active</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-gray-100 rounded-[4rem] shadow-2xl border-[16px] border-white overflow-hidden aspect-[1/1.4] relative group animate-reveal">
                <iframe 
                    key={previewKey}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/templates/${id}/preview/${eventId}?t=${previewKey}`}
                    className="w-full h-full border-none"
                    title="Live Card Preview"
                />
                
                {/* Visual Glass & Overlay Effects */}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[3rem]"></div>
                
                {/* Real-time Watermark */}
                {!isPurchased && (
                    <div className="absolute inset-0 pointer-events-none opacity-[0.04] select-none text-center flex items-center justify-center">
                        <div className="text-[14rem] font-black -rotate-12 transform scale-150">DIGITAL INVITE</div>
                    </div>
                )}
                
                {/* Luxury Shadow Depth */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]"></div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-start space-x-6">
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-400">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-2">Editor Tip</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">Use the <span className="text-indigo-600 font-bold">Refresh Preview</span> button or <span className="text-indigo-600 font-bold">Save Draft</span> to sync your latest stylistic choices with our rendering cloud.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
      
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}

export default function TemplatePreviewPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-xl animate-pulse font-black text-gray-300 uppercase tracking-widest">Waking Design Hub...</div>}>
            <TemplatePreviewContent />
        </Suspense>
    );
}
