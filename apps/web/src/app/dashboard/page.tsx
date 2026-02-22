"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Trash2, Edit3, PlusCircle, Sparkles, Clock, Layout } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [eRes, oRes] = await Promise.all([
          api.get('/events'),
          api.get('/orders')
      ]);
      setEvents(eRes.data);
      setOrders(oRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event project?')) return;
    try {
        await api.delete(`/events/${id}`);
        fetchData();
    } catch (error) {
        alert('Failed to delete event');
    }
  };

  if (!user) return <div className="p-12 text-center font-bold text-gray-400">Please login to access your workspace.</div>;

  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
                <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                    <Sparkles size={18} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Creative Workspace</span>
                </div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Welcome, {user.name.split(' ')[0]}</h1>
                <p className="text-gray-400 font-medium mt-2">Managing your signature celebrations with elegance.</p>
            </div>
            <Link 
                href="/create-event" 
                className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-black transition shadow-2xl shadow-gray-200 flex items-center group"
            >
                <PlusCircle className="mr-3 transition group-hover:rotate-90" />
                New Occasion
            </Link>
        </header>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
                { label: "Active Projects", val: events.length, icon: Layout, color: "text-indigo-600", bg: "bg-indigo-50" },
                { label: "Completed Designs", val: orders.filter((o: any) => o.paymentStatus === 'completed').length, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
                { label: "Elite Status", val: "Gold", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50" }
            ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-indigo-100 transition duration-500">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-4xl font-black text-gray-900 tracking-tighter">{stat.val}</p>
                    </div>
                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition duration-500 group-hover:scale-110`}>
                        <stat.icon size={28} />
                    </div>
                </div>
            ))}
        </div>
        
        <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Recent Signature Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-24 text-center">
                <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400 font-bold uppercase text-xs tracking-widest">Fetching your archives...</p>
            </div>
          ) : events.length > 0 ? (
            events.map((event: any) => (
              <div key={event._id} className="bg-white rounded-[3rem] shadow-sm border border-gray-50 overflow-hidden hover:shadow-2xl transition-all duration-700 group flex flex-col h-full">
                <div className="p-10 flex-1">
                   <div className="flex items-center justify-between mb-8">
                        <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">{event.eventType}</span>
                        <div className="flex items-center text-gray-300 font-bold text-[10px] uppercase tracking-widest">
                            <Calendar size={12} className="mr-1" />
                            {new Date(event.createdAt).toLocaleDateString()}
                        </div>
                   </div>
                   
                   <h3 className="text-2xl font-black text-gray-900 mb-3 truncate leading-tight group-hover:text-indigo-600 transition">{event.eventData?.title || 'Untitled Celebration'}</h3>
                   
                   <div className="space-y-3 mb-10">
                       <div className="flex items-start text-gray-400 text-sm font-medium">
                            <MapPin size={16} className="mr-2 mt-0.5 shrink-0" />
                            <span className="line-clamp-2">{event.eventData?.venue || "Location TBD"}</span>
                       </div>
                   </div>
                   
                   <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                        <Link 
                            href={event.selectedTemplateId ? `/template/${event.selectedTemplateId}?eventId=${event._id}` : `/templates?eventId=${event._id}`} 
                            className="bg-gray-900 text-white px-8 py-3 rounded-xl text-sm font-black hover:bg-black transition flex items-center group-hover:px-10 duration-500"
                        >
                            <span>{event.selectedTemplateId ? 'Edit Design' : 'Pick Design'}</span>
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition" />
                        </Link>
                        
                        <div className="flex space-x-1">
                            <button className="p-3 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition">
                                <Edit3 size={18} />
                            </button>
                            <button onClick={() => handleDelete(event._id)} className="p-3 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition">
                                <Trash2 size={18} />
                            </button>
                        </div>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 bg-white rounded-[4rem] border-4 border-dashed border-gray-50 flex flex-col items-center justify-center text-center animate-reveal">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8 border border-gray-100">
                    <Layout size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Your Creative Space is Empty.</h3>
                <p className="text-gray-400 max-w-sm mb-10 font-medium">Create your first event project and choose from our curated luxury invitation collection.</p>
                <Link href="/create-event" className="bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100">
                    Get Started Now
                </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
