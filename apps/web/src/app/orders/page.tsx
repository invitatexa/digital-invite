"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { IOrder } from '@digital-invite/types';
import { Download, CheckCircle, Clock } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/users/orders');
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Invoices & Downloads</h1>
            <p className="text-lg text-gray-500 mt-2">Access all your purchased invitation cards here.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order: any) => (
              <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition group">
                <div className="aspect-[1/1.2] bg-gray-100 relative overflow-hidden">
                    <img 
                        src={order.templateId?.previewUrl || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400'} 
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                        alt={order.templateId?.title}
                    />
                    <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {order.paymentStatus}
                        </span>
                    </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{order.templateId?.title || 'Invitation Card'}</h3>
                  <div className="flex items-center text-sm text-gray-400 mb-6">
                    <p>{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                  </div>
                  
                  {order.paymentStatus === 'completed' && order.downloadUrl ? (
                    <div className="flex flex-col gap-3">
                        <a
                          href={order.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                        >
                          <Download className="mr-2 h-5 w-5" /> Download PDF
                        </a>
                        <a 
                            href={`https://wa.me/?text=${encodeURIComponent("Check out my digital invitation: " + order.downloadUrl)}`}
                            target="_blank"
                            className="text-indigo-600 text-sm font-black uppercase tracking-widest hover:text-indigo-800 transition text-center"
                        >
                            Share on WhatsApp
                        </a>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <span className="text-gray-400 text-sm flex items-center">
                          <Clock className="mr-2 h-4 w-4 animate-pulse" /> Pending Fulfillment
                        </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
                <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400 text-4xl">📭</div>
                <h2 className="text-2xl font-bold text-gray-900">No Invitations Yet</h2>
                <p className="text-gray-500 mt-2 mb-8">You haven't purchased any invitations. Start by picking your favorite template!</p>
                <a href="/templates" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">Browse Templates</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
