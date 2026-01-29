"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Calendar, Clock, ChevronDown, 
  ShieldCheck, Car, Utensils, Droplets, 
  User, Leaf, Sparkles, Check, ChevronLeft, 
  AlertCircle, PartyPopper, Home 
} from 'lucide-react';

const SERVICES = [
  { id: 'DV', label: 'Driver', icon: <Car size={18} /> },
  { id: 'CK', label: 'Cook', icon: <Utensils size={18} /> },
  { id: 'CW', label: 'Car Wash', icon: <Droplets size={18} /> },
  { id: 'MD', label: 'Maid', icon: <User size={18} /> },
  { id: 'GD', label: 'Gardening', icon: <Leaf size={18} /> },
  { id: 'BC', label: 'Bathroom Cleaning', icon: <Sparkles size={18} /> },
];

export default function MultiStepBooking() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Service, 2: Schedule, 3: Success
  const [bookingData, setBookingData] = useState({
    service: SERVICES[0],
    date: '',
    time: ''
  });

  // Helper: Generate next 7 days with day and date
  const getAvailableDates = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        full: d.toISOString().split('T')[0],
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' })
      };
    });
  };

  // Helper: Generate 1-hour slots (07:30 to 18:30)
  const getTimeSlots = () => {
    const slots = [];
    let start = 7.5; 
    while (start < 18.5) {
      const h1 = Math.floor(start);
      const m1 = (start % 1) * 60 === 30 ? "30" : "00";
      const h2 = Math.floor(start + 1);
      const m2 = ((start + 1) % 1) * 60 === 30 ? "30" : "00";
      const format = (h, m) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        return `${hr}:${m} ${ampm}`;
      };
      slots.push(`${format(h1, m1)} - ${format(h2, m2)}`);
      start += 1;
    }
    return slots;
  };

  const dates = getAvailableDates();
  const timeSlots = getTimeSlots();

  const handleConfirm = () => {
    setStep(3);
  };

  const resetModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setBookingData({ service: SERVICES[0], date: '', time: '' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100"
      >
        <Plus size={20} /> Create Service
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={resetModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              {step < 3 && (
                <div className="h-1.5 w-full bg-slate-100 flex">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    className="h-full bg-indigo-600"
                  />
                </div>
              )}

              <div className="p-8">
                {/* STEP 1: SERVICE SELECTION */}
                {step === 1 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Choose Service</h2>
                      <button onClick={resetModal} className="p-2 hover:bg-slate-100 rounded-full"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { setBookingData({ ...bookingData, service: s }); setStep(2); }}
                          className="flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">{s.icon}</span>
                            <span className="font-bold text-slate-700">{s.label}</span>
                          </div>
                          <Check className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SCHEDULE */}
                {step === 2 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setStep(1)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
                        <h2 className="text-2xl font-bold text-slate-800">Select Date & Time</h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-3">Availability (Next 7 Days)</label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {dates.map((d) => (
                            <button
                              key={d.full}
                              onClick={() => setBookingData({ ...bookingData, date: `${d.day}, ${d.month} ${d.date}` })}
                              className={`flex-shrink-0 w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                                bookingData.date.includes(d.date) ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 text-slate-600 bg-slate-50'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase opacity-80">{d.day}</span>
                              <span className="text-xl font-black">{d.date}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-3">1-Hour Time Slots</label>
                        <div className="grid grid-cols-2 gap-2 h-40 overflow-y-auto pr-2 custom-scrollbar">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setBookingData({ ...bookingData, time: slot })}
                              className={`p-3 text-xs rounded-xl border-2 font-bold transition-all ${
                                bookingData.time === slot ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-50 text-slate-500 hover:border-slate-200'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="text-rose-600 shrink-0" size={18} />
                        <p className="text-rose-800 text-[11px] leading-relaxed">
                          <span className="font-bold">Cancellation Policy:</span> A flat fee of $15.00 applies if cancelled within 2 hours of the start time.
                        </p>
                      </div>

                      <button
                        disabled={!bookingData.date || !bookingData.time}
                        onClick={handleConfirm}
                        className="w-full bg-indigo-600 disabled:opacity-50 text-white py-5 rounded-2xl font-bold shadow-lg"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SUCCESS SCREEN */}
                {step === 3 && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <PartyPopper size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Booking Confirmed!</h2>
                    <p className="text-slate-500 mb-8">Your professional is scheduled and on the way.</p>
                    
                    <div className="bg-slate-50 rounded-3xl p-6 text-left space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">Service</span>
                        <span className="text-slate-800 font-bold flex items-center gap-2">
                          {bookingData.service.icon} {bookingData.service.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">Date</span>
                        <span className="text-slate-800 font-bold">{bookingData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">Time Slot</span>
                        <span className="text-slate-800 font-bold">{bookingData.time}</span>
                      </div>
                    </div>

                    <button 
                      onClick={resetModal}
                      className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-black transition-all"
                    >
                      <Home size={18} /> Back to Dashboard
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}