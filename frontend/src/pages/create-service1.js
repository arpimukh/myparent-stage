"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Calendar, Clock, ChevronDown, 
  ShieldCheck, Car, Utensils, Droplets, 
  User, Leaf, Sparkles, Check, ChevronLeft, 
  AlertCircle, PartyPopper, Home, Download, MapPin, AlignLeft, Timer, MessageSquare, ClipboardList
} from 'lucide-react';

const SERVICES = [
  { id: 'driver', label: 'Driver', icon: <Car size={18} />, rate: 15 },
  { id: 'cook', label: 'Cook', icon: <Utensils size={18} />, rate: 12 },
  { id: 'car_wash', label: 'Car Wash', icon: <Droplets size={18} />, rate: 10 },
  { id: 'maid', label: 'Maid', icon: <User size={18} />, rate: 10 },
  { id: 'gardening', label: 'Gardening', icon: <Leaf size={18} />, rate: 14 },
  { id: 'bathroom_cleaning', label: 'Bathroom Cleaning', icon: <Sparkles size={18} />, rate: 18 },
];

export default function ProfessionalBookingSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mapUrl, setMapUrl] = useState("");
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

  useEffect(() => {
    if (bookingData.pincode.length === 6) {
      const encodedPin = encodeURIComponent(bookingData.pincode);
      // Place your Google Maps API Key here
      setMapUrl(`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedPin}`);
    } else {
      setMapUrl("");
    }
  }, [bookingData.pincode]);

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

  const getTimeSlots = () => {
    const slots = [];
    let start = 7.5; 
    while (start < 18.5) {
      const format = (h) => {
        const hh = Math.floor(h);
        const mm = (h % 1) * 60 === 30 ? "30" : "00";
        const ampm = hh >= 12 ? 'PM' : 'AM';
        return `${hh % 12 || 12}:${mm} ${ampm}`;
      };
      slots.push(`${format(start)} - ${format(start + 1)}`);
      start += 1;
    }
    return slots;
  };

  const serviceCharge = bookingData.service.rate * bookingData.duration;
  const handleConfirm = () => {
    setBookingData(prev => ({ ...prev, id: `SRV-${Math.floor(1000 + Math.random() * 9000)}` }));
    setStep(5);
  };

  const resetModal = () => {
    setIsOpen(false);
    setTimeout(() => { setStep(1); setBookingData({ service: SERVICES[0], date: '', time: '', duration: 1, address: '', pincode: '', instructions: '', id: '' }); }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.button onClick={() => setIsOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl">
        <Plus size={22} /> <span className="text-lg">New Booking</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

            <motion.div layout initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative bg-white w-full max-w-[480px] rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
              
              {step < 5 && (
                <div className="flex h-1.5 w-full bg-slate-100">
                  <motion.div animate={{ width: `${(step / 4) * 100}%` }} className="h-full bg-indigo-600 transition-all duration-500" />
                </div>
              )}

              <div className="p-8">
                {/* STEP 1: SERVICE */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 1: Service</h2>
                      <button onClick={resetModal} className="p-2 bg-slate-100 rounded-full"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {SERVICES.map((s) => (
                        <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); setStep(2); }} className="flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-slate-50 bg-slate-50 hover:border-indigo-600 hover:bg-white transition-all group">
                          <span className="mb-2 p-3 bg-white rounded-2xl shadow-sm group-hover:text-indigo-600 transition-colors">{s.icon}</span>
                          <span className="font-bold text-slate-700 text-sm">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SCHEDULE */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <button onClick={() => setStep(1)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 2: Time</h2>
                    </div>
                    <div>
                      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                        {dates.map((d) => (
                          <button key={d.full} onClick={() => setBookingData({ ...bookingData, date: `${d.day}, ${d.month} ${d.date}` })} className={`flex-shrink-0 w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${bookingData.date.includes(d.date) ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
                            <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                            <span className="text-xl font-black">{d.date}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({...bookingData, time: e.target.value})}>
                        <option value="">Start Slot</option>
                        {getTimeSlots().map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({...bookingData, duration: parseInt(e.target.value)})}>
                        {[1,2,3,4,8].map(h => <option key={h} value={h}>{h} Hour{h>1?'s':''}</option>)}
                      </select>
                    </div>
                    <button disabled={!bookingData.date || !bookingData.time} onClick={() => setStep(3)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Next: Location</button>
                  </motion.div>
                )}

                {/* STEP 3: LOCATION */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <button onClick={() => setStep(2)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 3: Address</h2>
                    </div>
                    <div className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden relative border-2 border-slate-50">
                      {bookingData.pincode.length === 6 ? <iframe width="100%" height="100%" frameBorder="0" src={mapUrl}></iframe> : <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-bold text-[10px] uppercase">Pin to Preview Map</div>}
                    </div>
                    <div className="flex gap-2">
                      <input placeholder="Pin" maxLength={6} value={bookingData.pincode} onChange={(e) => setBookingData({...bookingData, pincode: e.target.value.replace(/\D/g, '')})} className="w-24 bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" />
                      <input placeholder="Apt/Building" value={bookingData.address} onChange={(e) => setBookingData({...bookingData, address: e.target.value})} className="flex-1 bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" />
                    </div>
                    <button disabled={bookingData.pincode.length < 6 || !bookingData.address} onClick={() => setStep(4)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Next: Instructions</button>
                  </motion.div>
                )}

                {/* STEP 4: SPECIAL INSTRUCTIONS */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <button onClick={() => setStep(3)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 4: Details</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-4 border border-indigo-100">
                        <MessageSquare className="text-indigo-600" size={24}/>
                        <div className="flex-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Additional Notes</label>
                          <textarea 
                            placeholder="Any specific instructions for the professional? (e.g., call upon arrival, parking details...)" 
                            value={bookingData.instructions} 
                            onChange={(e) => setBookingData({...bookingData, instructions: e.target.value})} 
                            className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 resize-none h-24" 
                          />
                        </div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-2xl flex items-start gap-3 border border-amber-100">
                        <ShieldCheck size={18} className="text-amber-600 shrink-0"/>
                        <p className="text-amber-800 text-[10px] font-bold italic leading-relaxed">Safety First: Our professionals follow strict hygiene protocols. No hidden charges apply.</p>
                      </div>
                    </div>
                    <button onClick={handleConfirm} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-2xl">Confirm Booking - ${serviceCharge}</button>
                  </motion.div>
                )}

                {/* STEP 5: SUCCESS */}
                {step === 5 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-4">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><PartyPopper size={36} /></div>
                    <h2 className="text-3xl font-black text-slate-800">Booking Ready!</h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase mb-8 tracking-widest">ID: {bookingData.id}</p>
                    <div className="bg-slate-50 rounded-[2rem] p-6 text-left space-y-3 mb-8">
                      <div className="flex justify-between text-xs font-bold uppercase text-slate-400"><span>Service</span><span className="text-indigo-600">{bookingData.service.label}</span></div>
                      <div className="flex justify-between text-xs font-bold uppercase text-slate-400"><span>Schedule</span><span className="text-slate-800">{bookingData.date} @ {bookingData.time.split(' ')[0]}</span></div>
                      {bookingData.instructions && <div className="border-t pt-3 text-[10px] text-slate-500 italic">" {bookingData.instructions} "</div>}
                    </div>
                    <button onClick={resetModal} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest">Done</button>
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