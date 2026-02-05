import React from 'react';
import Head from 'next/head';
import { Lock, Mail, ArrowRight, Star } from 'lucide-react';

export default function MemberLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf2f8] relative overflow-hidden font-sans">
      <Head>
        <title>Member Login | Living Trail</title>
      </Head>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="w-full max-w-md px-6 relative z-10">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl mb-4 transform -rotate-6 border border-pink-100">
             {/* Simplified Unicorn SVG for the Login entrance */}
             <svg viewBox="0 0 100 100" className="w-12 h-12 fill-pink-300">
                <path d="M50 10 C 30 10 10 30 10 50 C 10 70 30 90 50 90 C 70 90 90 70 90 50 C 90 30 70 10 50 10 Z M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 Z" />
             </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Living Trail</h1>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Star size={12} className="text-pink-400 fill-pink-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Premium Member Access</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800">Welcome back</h2>
            <p className="text-sm text-slate-500 mt-1">Please enter your details to access your dashboard.</p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                <a href="#" className="text-[11px] font-bold text-pink-500 hover:text-pink-600 transition">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all shadow-lg shadow-slate-200">
              Sign In to Dashboard
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* New Member Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Not a member yet? <a href="#" className="text-pink-500 font-bold hover:underline">Apply for Membership</a>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-10 text-xs text-slate-400 font-medium">
          Protected by Living Trail SecureCloud™
        </p>
      </div>
    </div>
  );
}