"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Calendar, Clock, ChevronDown, 
  ShieldCheck, Car, Utensils, Droplets, 
  User, Leaf, Sparkles, Check 
} from 'lucide-react';

const SERVICES = [
  { id: 'driver', label: 'Driver', icon: <Car size={18} /> },
  { id: 'cook', label: 'Cook', icon: <Utensils size={18} /> },
  { id: 'car_wash', label: 'Car Wash', icon: <Droplets size={18} /> },
  { id: 'maid', label: 'Maid', icon: <User size={18} /> },
  { id: 'gardening', label: 'Gardening', icon: <Leaf size={18} /> },
  { id: 'bathroom_cleaning', label: 'Bathroom Cleaning', icon: <Sparkles size={18} /> },
];

export default function ServicePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [ddlOpen, setDdlOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDdlOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      
      {/* 1. Trigger Button (Standard Scale Animation) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all"
      >
        <Plus size={20} />
        Create Service
      </motion.button>

      {/* 2. Booking Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 pb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">New Request</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>

              <form className="p-8 pt-2 space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                {/* CUSTOM SERVICE DDL WITH ICONS */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Service Type</label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDdlOpen(!ddlOpen)}
                      className="w-full flex items-center justify-between bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl hover:border-indigo-200 transition-all"
                    >
                      <div className="flex items-center gap-3 font-semibold text-slate-700">
                        <span className="text-indigo-600">{selectedService.icon}</span>
                        {selectedService.label}
                      </div>
                      <ChevronDown className={`text-slate-400 transition-transform ${ddlOpen ? 'rotate-180' : ''}`} size={18} />
                    </button>

                    <AnimatePresence>
                      {ddlOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-20"
                        >
                          {SERVICES.map((service) => (
                            <div
                              key={service.id}
                              onClick={() => {
                                setSelectedService(service);
                                setDdlOpen(false);
                              }}
                              className="flex items-center justify-between p-4 hover:bg-indigo-50 cursor-pointer transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                                  {service.icon}
                                </span>
                                <span className="font-medium text-slate-700">{service.label}</span>
                              </div>
                              {selectedService.id === service.id && <Check size={16} className="text-indigo-600" />}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Date</label>
                    <input type="date" className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Schedule</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-indigo-500 outline-none appearance-none">
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl text-indigo-700 text-xs font-semibold">
                  <ShieldCheck size={18} />
                  <span>Instant booking with verified professionals.</span>
                </div>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-lg"
                >
                  Book {selectedService.label}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}