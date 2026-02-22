"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { LogOut, User as UserIcon, Calendar, Layout, Menu, X, Shield, History } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mr-3 shadow-lg shadow-indigo-200 group-hover:rotate-12 transition duration-300">
                <Shield size={20} fill="currentColor" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-gray-900">Digital<span className="text-indigo-600">Invite</span></span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/templates" className="inline-flex items-center px-1 pt-1 text-sm font-black text-gray-500 hover:text-indigo-600 transition">
                Collections
              </Link>
              {user && (
                <>
                  <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-black text-gray-500 hover:text-indigo-600 transition">
                    Dashboard
                  </Link>
                  <Link href="/orders" className="inline-flex items-center px-1 pt-1 text-sm font-black text-gray-500 hover:text-indigo-600 transition">
                    My Invoices
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex md:items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col text-right">
                    <span className="text-sm font-black text-gray-900">Hi, {user.name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.role} Account</span>
                </div>
                {user.role === 'admin' && (
                    <Link href="/admin" className="p-2 text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition" title="Admin Panel">
                        <Layout size={20} />
                    </Link>
                )}
                <button
                  onClick={logout}
                  className="p-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-900 text-sm font-black hover:text-indigo-600 transition">Sign In</Link>
                <Link href="/register" className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-black transition shadow-xl shadow-gray-200">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/templates" className="block px-3 py-4 text-base font-black text-gray-900">Collections</Link>
            {user && (
              <>
                <Link href="/dashboard" className="block px-3 py-4 text-base font-black text-gray-900">Dashboard</Link>
                <Link href="/orders" className="block px-3 py-4 text-base font-black text-gray-900">My Invoices</Link>
              </>
            )}
            <div className="border-t mt-4 pt-4">
              {user ? (
                <button onClick={logout} className="w-full text-left px-3 py-4 text-base font-black text-red-600 flex items-center">
                    <LogOut className="mr-2" size={20} /> Logout
                </button>
              ) : (
                <div className="space-y-4 p-3">
                  <Link href="/login" className="block text-center py-4 bg-gray-50 rounded-2xl font-black text-gray-900">Sign In</Link>
                  <Link href="/register" className="block text-center py-4 bg-indigo-600 rounded-2xl font-black text-white">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
