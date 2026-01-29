"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Calendar, Clock, ChevronDown, 
  Car, Utensils, Droplets, User, Leaf, Sparkles, 
  Check, ChevronLeft, AlertCircle, PartyPopper, 
  MapPin, Timer, ShieldCheck, Loader2, Phone, MessageSquare, Navigation
} from 'lucide-react';

const SERVICES = [
  { id: 'driver', label: 'Driver', icon: <Car size={18} />, rate: 15 },
  { id: 'cook', label: 'Cook', icon: <Utensils size={18} />, rate: 12 },
  { id: 'car_wash', label: 'Car Wash', icon: <Droplets size={18} />, rate: 10 },
  { id: 'maid', label: 'Maid', icon: <User size={18} />, rate: 10 },
  { id: 'gardening', label: 'Gardening', icon: <Leaf size={18} />, rate: 14 },
  { id: 'bathroom_cleaning', label: 'Bathroom Cleaning', icon: <Sparkles size={18} />, rate: 18 },
];

export default function BookingWithTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState({
    service: SERVICES[0],
    date: '',
    time: '',
    duration: 1,
    address: '',
    pincode: '',
    id: ''
  });

  const totalAmount = (bookingData.service.rate * bookingData.duration * 1.18).toFixed(2);

  const handleRazorpay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingData(prev => ({ ...prev, id: `RZP_${Math.floor(Math.random() * 900000)}` }));
      setStep(6);
    }, 2000);
  };

  const resetModal = () => {
    setIsOpen(false);
    setTimeout(() => setStep(1), 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <button onClick={() => setIsOpen(true)} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl">
        Book Service
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            
            <motion.div layout className="relative bg-white w-full max-w-[480px] rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
              <div className="p-8">
                
                {/* OMITTED STEPS 1-4 for brevity (Logic remains from previous versions) */}
                {step < 5 && (
                   <div className="text-center py-20">
                     <h3 className="text-xl font-bold mb-4">Step {step}: Details</h3>
                     <button onClick={() => setStep(5)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl">Next to Payment</button>
                   </div>
                )}

                {/* STEP 5: RAZORPAY GATEWAY */}
                {step === 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="flex items-center gap-2"><button onClick={() => setStep(4)}><ChevronLeft/></button><h2 className="text-2xl font-black">Secure Payment</h2></div>
                    <div className="bg-slate-900 p-6 rounded-3xl text-white">
                      <p className="text-[10px] uppercase opacity-50 font-bold mb-1 tracking-widest">Payable Amount</p>
                      <h1 className="text-4xl font-black tracking-tighter">${totalAmount}</h1>
                    </div>
                    <button onClick={handleRazorpay} disabled={isProcessing} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3">
                      {isProcessing ? <Loader2 className="animate-spin"/> : `Pay via Razorpay`}
                    </button>
                  </motion.div>
                )}

                {/* STEP 6: SUCCESS SUMMARY */}
                {step === 6 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><PartyPopper size={40}/></div>
                    <h2 className="text-3xl font-black text-slate-800">Payment Success!</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase mt-2 mb-8 tracking-widest">ID: {bookingData.id}</p>
                    <button onClick={() => setStep(7)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2">
                      <Navigation size={18}/> Track Professional Live
                    </button>
                  </motion.div>
                )}

                {/* STEP 7: LIVE TRACKER */}
                {step === 7 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">Live Tracker</h2>
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase">On the Way</div>
                    </div>

                    {/* Progress Visual */}
                    <div className="relative py-4">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
                      <div className="space-y-8 relative">
                        <div className="flex items-center gap-6">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center z-10"><Check size={14} className="text-white"/></div>
                          <div className="opacity-40"><p className="text-xs font-black uppercase text-slate-400">Booking Confirmed</p></div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow-sm flex items-center justify-center z-10"><div className="w-2 h-2 bg-white rounded-full animate-ping"/></div>
                          <div>
                            <p className="text-xs font-black uppercase text-indigo-600">Professional is En Route</p>
                            <p className="text-[10px] font-bold text-slate-400">Estimated Arrival: 12 mins</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border-4 border-white z-10" />
                          <div className="opacity-30"><p className="text-xs font-black uppercase text-slate-400">Service Start</p></div>
                        </div>
                      </div>
                    </div>

                    {/* Professional Info Card */}
                    <div className="bg-slate-50 border-2 border-slate-100 p-5 rounded-[2rem] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-2xl overflow-hidden">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Pro" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">Alex Johnson</p>
                          <div className="flex items-center gap-1 text-amber-500"><Sparkles size={10} fill="currentColor"/> <span className="text-[10px] font-bold">4.9 Star Professional</span></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm border border-slate-100"><Phone size={18}/></button>
                        <button className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm border border-slate-100"><MessageSquare size={18}/></button>
                      </div>
                    </div>

                    <button onClick={resetModal} className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest">Close Tracker</button>
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