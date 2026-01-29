"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Calendar, Clock, ChevronDown, 
  Car, Utensils, Droplets, User, Leaf, Sparkles, 
  Check, ChevronLeft, AlertCircle, PartyPopper, 
  Download, MapPin, AlignLeft, Timer, CreditCard, ShieldCheck, Loader2
} from 'lucide-react';

const SERVICES = [
  { id: 'driver', label: 'Driver', icon: <Car size={18} />, rate: 15 },
  { id: 'cook', label: 'Cook', icon: <Utensils size={18} />, rate: 12 },
  { id: 'car_wash', label: 'Car Wash', icon: <Droplets size={18} />, rate: 10 },
  { id: 'maid', label: 'Maid', icon: <User size={18} />, rate: 10 },
  { id: 'gardening', label: 'Gardening', icon: <Leaf size={18} />, rate: 14 },
  { id: 'bathroom_cleaning', label: 'Bathroom Cleaning', icon: <Sparkles size={18} />, rate: 18 },
];

export default function RazorpayBookingSystem() {
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
    instructions: '',
    id: ''
  });

  // Calculation Logic
  const serviceCharge = bookingData.service.rate * bookingData.duration;
  const tax = Number((serviceCharge * 0.18).toFixed(2)); // 18% GST typical for Razorpay regions
  const totalAmount = (serviceCharge + tax).toFixed(2);

  // Helper: Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  // Simulated Razorpay Payment Trigger
  const handleRazorpayPayment = () => {
    setIsProcessing(true);
    
    // Simulate Razorpay processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setBookingData(prev => ({ ...prev, id: `RZP_${Math.floor(Math.random() * 1000000)}` }));
      setStep(6); // Move to Success
    }, 2500);
  };

  const resetModal = () => {
    setIsOpen(false);
    setTimeout(() => { setStep(1); setIsProcessing(false); }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.button 
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3"
      >
        <Plus size={22}/> Create Service
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            
            <motion.div layout className="relative bg-white w-full max-w-[480px] rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
              
              {/* Progress Header */}
              {step < 6 && (
                <div className="px-8 pt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {step > 1 && (
                      <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-slate-100 rounded-full">
                        <ChevronLeft size={20} />
                      </button>
                    )}
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                      {step === 5 ? "Payment" : "New Booking"}
                    </h2>
                  </div>
                  <button onClick={resetModal} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              )}

              <div className="p-8">
                {/* STEP 1: SERVICE */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-2 gap-3">
                      {SERVICES.map((s) => (
                        <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); setStep(2); }}
                          className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-slate-50 bg-slate-50 hover:border-indigo-600 hover:bg-white transition-all group"
                        >
                          <span className="mb-3 p-3 bg-white rounded-2xl shadow-sm group-hover:text-indigo-600">{s.icon}</span>
                          <span className="font-bold text-slate-700 text-sm">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SCHEDULE */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {dates.map((d) => (
                        <button key={d.full} onClick={() => setBookingData({ ...bookingData, date: `${d.day}, ${d.month} ${d.date}` })}
                          className={`flex-shrink-0 w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${bookingData.date.includes(d.date) ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                        >
                          <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                          <span className="text-xl font-black">{d.date}</span>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({...bookingData, time: e.target.value})}>
                        <option value="">Start Slot</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                      </select>
                      <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({...bookingData, duration: parseInt(e.target.value)})}>
                        {[1,2,4,8].map(h => <option key={h} value={h}>{h} Hour{h>1?'s':''}</option>)}
                      </select>
                    </div>
                    <button disabled={!bookingData.date || !bookingData.time} onClick={() => setStep(3)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Continue</button>
                  </motion.div>
                )}

                {/* STEP 3 & 4 (Address & Instructions) - Compressed for display */}
                {step === 3 && (
                  <div className="space-y-4">
                    <input placeholder="Pincode" maxLength={6} onChange={(e) => setBookingData({...bookingData, pincode: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" />
                    <textarea placeholder="Address Details" onChange={(e) => setBookingData({...bookingData, address: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-24" />
                    <button onClick={() => setStep(4)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Next</button>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Special Instructions</label>
                    <textarea placeholder="Any notes for the professional?" onChange={(e) => setBookingData({...bookingData, instructions: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-32" />
                    <button onClick={() => setStep(5)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Proceed to Payment</button>
                  </div>
                )}

                {/* STEP 5: RAZORPAY PAYMENT GATEWAY */}
                {step === 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Final Amount</p>
                        <h3 className="text-4xl font-black tracking-tighter">${totalAmount}</h3>
                      </div>
                      <ShieldCheck className="absolute -right-4 -bottom-4 text-white/5" size={120} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-bold text-slate-500">
                        <span>{bookingData.service.label} ({bookingData.duration}hr)</span>
                        <span>${serviceCharge.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-slate-500 pb-3 border-b border-slate-100">
                        <span>GST (18%)</span>
                        <span>${tax}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
                      <img src="https://razorpay.com/favicon.png" className="w-6 h-6" alt="Razorpay" />
                      <div>
                        <p className="text-[10px] font-black text-blue-800 uppercase">Secured by Razorpay</p>
                        <p className="text-[10px] text-blue-600 font-medium">Cards, UPI, Netbanking supported</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleRazorpayPayment} 
                      disabled={isProcessing}
                      className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all hover:bg-indigo-700 active:scale-95"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Processing...
                        </>
                      ) : (
                        `Pay Now $${totalAmount}`
                      )}
                    </button>
                  </motion.div>
                )}

                {/* STEP 6: SUCCESS */}
                {step === 6 && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <PartyPopper size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">Payment Paid!</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Booking ID: {bookingData.id}</p>
                    
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 text-left space-y-4 mb-8">
                      <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                        <span>Scheduled For</span>
                        <span className="text-slate-800">{bookingData.date}</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                        <span>Professional</span>
                        <span className="text-indigo-600">{bookingData.service.label}</span>
                      </div>
                    </div>

                    <button onClick={resetModal} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 uppercase tracking-widest text-sm">Return to Dashboard</button>
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