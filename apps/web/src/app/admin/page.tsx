"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { ITemplate } from '@digital-invite/types';
import { Plus, Trash2, Edit, Shield, CheckCircle2, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<ITemplate>>({
    title: '',
    category: 'Wedding',
    type: 'image',
    price: 499,
    previewUrl: '',
    sourceUrl: '',
    isPremium: false,
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
        router.push('/dashboard');
        return;
    }
    fetchTemplates();
  }, [user]);

  const fetchTemplates = async () => {
    try {
      const res = await api.get('/templates');
      setTemplates(res.data);
    } catch (error) {
      console.error('Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTemplate) {
        await api.put(`/templates/${editingTemplate}`, newTemplate);
      } else {
        await api.post('/templates', newTemplate);
      }
      setShowAddModal(false);
      setEditingTemplate(null);
      setNewTemplate({ title: '', category: 'Wedding', type: 'image', price: 499, previewUrl: '', sourceUrl: '', isPremium: false });
      fetchTemplates();
    } catch (error) {
      alert(`Failed to ${editingTemplate ? 'update' : 'add'} template`);
    }
  };

  const handleEdit = (template: ITemplate) => {
    setEditingTemplate(template._id);
    setNewTemplate({
        title: template.title,
        category: template.category,
        type: template.type,
        price: template.price,
        previewUrl: template.previewUrl,
        sourceUrl: template.sourceUrl,
        isPremium: template.isPremium
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;
    try {
        await api.delete(`/templates/${id}`);
        fetchTemplates();
    } catch (error) {
        alert('Delete failed');
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
                <Shield className="mr-3 text-indigo-600" size={36} />
                Control Center
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Manage your premium invitation catalog.</p>
          </div>
          <button
            onClick={() => {
                setEditingTemplate(null);
                setNewTemplate({ title: '', category: 'Wedding', type: 'image', price: 499, previewUrl: '', sourceUrl: '', isPremium: false });
                setShowAddModal(true);
            }}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center hover:bg-indigo-700 transition shadow-xl shadow-indigo-100"
          >
            <Plus className="mr-2 h-5 w-5" /> Create Template
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Design Details</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Investment</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {templates.map((template: any) => (
                <tr key={template._id} className="hover:bg-gray-50/30 transition">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="h-16 w-12 rounded-lg overflow-hidden ring-4 ring-white shadow-md">
                        <img className="h-full w-full object-cover" src={template.previewUrl} alt="" />
                      </div>
                      <div className="ml-6">
                        <div className="text-lg font-black text-gray-900 leading-tight">{template.title}</div>
                        <div className="text-xs text-indigo-500 font-bold uppercase mt-1 flex items-center">
                            <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2"></span>
                            {template.sourceUrl}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-600">
                        {template.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-xl font-black text-gray-900 tracking-tighter">₹{template.price}</div>
                  </td>
                  <td className="px-8 py-6">
                    {template.isPremium ? (
                        <span className="text-amber-500 flex items-center font-black text-[10px] uppercase tracking-widest">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 shadow-sm shadow-amber-200"></div>
                            VIP Design
                        </span>
                    ) : (
                        <span className="text-gray-400 flex items-center font-black text-[10px] uppercase tracking-widest">
                            <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                            Standard
                        </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleEdit(template)} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(template._id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {templates.length === 0 && !loading && (
              <div className="py-20 text-center">
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm italic">Catalog is currently empty.</p>
              </div>
          )}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl relative overflow-hidden">
              <button 
                onClick={() => {
                    setShowAddModal(false);
                    setEditingTemplate(null);
                }} 
                className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition"
              >
                  <X size={24} />
              </button>
              
              <h2 className="text-3xl font-black text-gray-900 mb-2">{editingTemplate ? 'Modify Design' : 'New Template'}</h2>
              <p className="text-gray-400 font-medium mb-8">{editingTemplate ? `Updating ${newTemplate.title}` : 'Deploy a new design to the collection.'}</p>

              <form onSubmit={handleAddTemplate} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Design Title</label>
                    <input
                        placeholder="e.g. Royal Maroon Gold Wedding"
                        className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 font-bold text-gray-700"
                        value={newTemplate.title}
                        onChange={e => setNewTemplate({...newTemplate, title: e.target.value})}
                        required
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                        <select
                            className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 font-bold"
                            value={newTemplate.category}
                            onChange={e => setNewTemplate({...newTemplate, category: e.target.value})}
                        >
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Mundan">Mundan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Base Price (INR)</label>
                        <input
                            type="number"
                            className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 font-bold"
                            value={newTemplate.price}
                            onChange={e => setNewTemplate({...newTemplate, price: Number(e.target.value)})}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Preview Image URL</label>
                    <input
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 font-bold text-xs"
                        value={newTemplate.previewUrl}
                        onChange={e => setNewTemplate({...newTemplate, previewUrl: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Template File Path</label>
                    <input
                        placeholder="wedding_royal.html"
                        className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 font-bold text-gray-700"
                        value={newTemplate.sourceUrl}
                        onChange={e => setNewTemplate({...newTemplate, sourceUrl: e.target.value})}
                        required
                    />
                </div>

                <label className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                        type="checkbox" 
                        className="w-6 h-6 rounded-lg border-none bg-gray-100 text-indigo-600 focus:ring-0" 
                        checked={newTemplate.isPremium}
                        onChange={e => setNewTemplate({...newTemplate, isPremium: e.target.checked})}
                    />
                    <span className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition">Mark as Premium Design</span>
                </label>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 flex items-center justify-center space-x-2">
                    <CheckCircle2 size={24} />
                    <span>{editingTemplate ? 'Update Design' : 'Finalize Design'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
