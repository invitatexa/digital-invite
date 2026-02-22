"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/auth/login', data);
      setAuth(res.data.user, res.data.token);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex border-t border-gray-100">
      {/* Right Side: Image (Swapped for variety) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-indigo-900/50 mix-blend-multiply"></div>
        <img 
            src="/auth_side_bg.png" 
            className="w-full h-full object-cover scale-x-[-1]" 
            alt="Venue" 
        />
        <div className="absolute inset-0 flex items-center justify-center p-20">
            <div className="max-w-sm text-right">
                <blockquote className="text-white text-3xl font-black leading-tight mb-6">
                    "Sophistication is the ultimate luxury."
                </blockquote>
                <div className="h-1 w-12 bg-indigo-500 rounded-full ml-auto"></div>
            </div>
        </div>
      </div>

      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full animate-reveal">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Welcome Back.</h1>
            <p className="text-gray-500 font-medium">Continue your journey with DigitalInvite.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition" size={20} />
              <input
                {...register('email')}
                type="email"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-indigo-600 transition"
                placeholder="Email Address"
              />
              {errors.email && <p className="text-red-500 text-[10px] font-black uppercase mt-2 ml-2 tracking-widest">{errors.email.message}</p>}
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition" size={20} />
              <input
                {...register('password')}
                type="password"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-indigo-600 transition"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-[10px] font-black uppercase mt-2 ml-2 tracking-widest">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition transform active:scale-95 shadow-2xl shadow-indigo-100 flex items-center justify-center space-x-3"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In Now'}</span>
              <ArrowRight size={20} />
            </button>
            
            <div className="flex items-center justify-between text-sm font-bold">
                <p className="text-gray-500">
                  New here? <Link href="/register" className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4">Join Free</Link>
                </p>
                <Link href="/forgot-password" title="Mocked Link" className="text-gray-400 hover:text-gray-600">Forgot Password?</Link>
            </div>
          </form>

          <div className="mt-12 p-6 bg-indigo-50 rounded-2xl flex items-start space-x-4 border border-indigo-100/50">
            <ShieldCheck className="text-indigo-600 shrink-0" size={24} />
            <p className="text-xs text-indigo-700 font-bold leading-relaxed">
                Your account is protected by industry-standard 256-bit encryption. We never store plain-text passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
