"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, User, Star, ArrowRight, Sparkles, Clock, Phone } from 'lucide-react';

const eventSchema = z.object({
  eventType: z.enum(['Wedding', 'Mundan', 'Birthday', 'Engagement', 'Baby Shower', 'Housewarming']),
  title: z.string().min(5, "Title is too short"),
  hostName: z.string().min(2, "Host name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  venue: z.string().min(5, "Venue address is needed"),
  mapsLink: z.string().url("Invalid URL").optional().or(z.literal('')),
  rsvpDate: z.string().optional(),
  phone: z.string().min(10, "Valid phone number required"),
  // Dynamic fields
  nameA: z.string().optional(),
  nameB: z.string().optional(),
  kidName: z.string().optional(),
  age: z.string().optional(),
});

type EventForm = z.infer<typeof eventSchema>;

export default function CreateEventPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: { eventType: 'Wedding' }
  });

  const selectedType = watch('eventType');

  const onSubmit = async (data: EventForm) => {
    try {
      const { eventType, ...eventData } = data;
      const res = await api.post('/events', { eventType, eventData });
      router.push(`/templates?eventId=${res.data._id}`);
    } catch (error) {
      alert('Failed to create event');
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-reveal">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="text-indigo-600 w-4 h-4" />
                <span className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">New Event Creation</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Share Your Joy.</h1>
            <p className="text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">Enter your event details precisely. Our elite design engine will weave them into a masterpiece.</p>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-indigo-100/20 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 filter blur-3xl"></div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 relative z-10">
                {/* Section: Type Selection */}
                <div className="space-y-6">
                    <label className="flex items-center space-x-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                        <Star size={14} />
                        <span>1. Choose Occasion Type</span>
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {['Wedding', 'Birthday', 'Mundan', 'Engagement', 'Baby Shower', 'Housewarming'].map((type) => (
                            <label key={type} className="cursor-pointer group">
                                <input {...register('eventType')} type="radio" value={type} className="hidden peer" />
                                <div className="p-6 bg-gray-50 border-2 border-transparent rounded-[2rem] text-center font-black text-sm text-gray-400 peer-checked:bg-white peer-checked:border-indigo-600 peer-checked:text-indigo-600 transition duration-300 transform peer-checked:scale-105 group-hover:bg-gray-100">
                                    {type}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Section: Dynamic Content */}
                <div className="space-y-8">
                    <label className="flex items-center space-x-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                        <User size={14} />
                        <span>2. Essential Details</span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Invitation Headline</label>
                            <input
                                {...register('title')}
                                placeholder="Celebrate our togetherness at..."
                                className="w-full bg-gray-100 border-none rounded-2xl p-4 font-bold text-gray-700 outline-none"
                            />
                            {errors.title && <p className="text-red-500 text-[10px] font-black uppercase mt-2">{errors.title.message}</p>}
                        </div>

                        {selectedType === 'Wedding' && (
                            <>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Groom's First Name</label>
                                    <input {...register('nameA')} placeholder="Rahul" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Bride's First Name</label>
                                    <input {...register('nameB')} placeholder="Kajal" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                                </div>
                            </>
                        )}

                        {selectedType === 'Birthday' && (
                            <>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Celebrant's Name</label>
                                    <input {...register('nameA')} placeholder="Olivia" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Turning Age</label>
                                    <input {...register('age')} placeholder="1st or 5th" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                                </div>
                            </>
                        )}

                        {selectedType === 'Mundan' && (
                            <div className="col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Kid's Name</label>
                                <input {...register('kidName')} placeholder="Aarav" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Primary Host</label>
                            <input {...register('hostName')} placeholder="Mr. & Mrs. Sharma" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                        </div>
                        
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Contact Phone</label>
                            <input {...register('phone')} placeholder="+91 99999 99999" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Section: Logistics */}
                <div className="space-y-8">
                    <label className="flex items-center space-x-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                        <Calendar size={14} />
                        <span>3. When & Where</span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Event Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                <input {...register('date')} type="date" className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 font-bold" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Arrival Time</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                <input {...register('time')} placeholder="7:00 PM Onwards" className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 font-bold" />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Venue Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-6 text-gray-400 pointer-events-none" size={18} />
                                <textarea {...register('venue')} rows={3} placeholder="Full address of the celebration palace..." className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 font-bold" />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">RSVP Deadline (Optional)</label>
                            <input {...register('rsvpDate')} placeholder="Kindly respond by December 15th" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold" />
                        </div>
                    </div>
                </div>

                <div className="pt-10">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition transform active:scale-95 shadow-2xl shadow-indigo-100 flex items-center justify-center space-x-3"
                    >
                        <span>{isSubmitting ? 'Processing Details...' : 'Proceed to Collections'}</span>
                        <ArrowRight size={24} />
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-6">Securely stored and encrypted. Privacy is our luxury.</p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
