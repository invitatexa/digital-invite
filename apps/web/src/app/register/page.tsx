"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.post('/auth/register', data);
      setAuth(res.data.user, res.data.token);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex border-t border-gray-100">
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full animate-reveal">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Begin Your Journey.</h1>
            <p className="text-gray-500 font-medium">Join DigitalInvite to create world-class invitations.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative group">
              <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition" size={20} />
              <input
                {...register('name')}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-indigo-600 transition"
                placeholder="Full Name"
              />
              {errors.name && <p className="text-red-500 text-[10px] font-black uppercase mt-2 ml-2 tracking-widest">{errors.name.message}</p>}
            </div>

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
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition" size={20} />
              <input
                {...register('phone')}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-indigo-600 transition"
                placeholder="Phone Number"
              />
              {errors.phone && <p className="text-red-500 text-[10px] font-black uppercase mt-2 ml-2 tracking-widest">{errors.phone.message}</p>}
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
              <span>{isSubmitting ? 'Creating Account...' : 'Get Started'}</span>
              <ArrowRight size={20} />
            </button>
            
            <p className="text-center text-sm font-bold text-gray-500">
              Already a member? <Link href="/login" className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4">Sign In</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply transition duration-500 group-hover:bg-indigo-900/30"></div>
        <img 
            src="/auth_side_bg.png" 
            className="w-full h-full object-cover" 
            alt="Venue" 
        />
        <div className="absolute inset-0 flex items-center justify-center p-20">
            <div className="max-w-sm">
                <blockquote className="text-white text-3xl font-black leading-tight mb-6">
                    "Every great event starts with a stunning invitation."
                </blockquote>
                <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
            </div>
        </div>
      </div>
    </div>
  );
}
