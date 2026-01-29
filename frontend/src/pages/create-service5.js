"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Star, MessageSquare, ThumbsUp, 
  Send, Sparkles, User, Award, ShieldCheck
} from 'lucide-react';

// --- Feedback Step Component ---
export default function ServiceFeedback({ proName = "Alex Johnson", onFinish }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);

  const complimentTags = ["Punctual", "Professional", "Deep Clean", "Polite", "Expert"];

  const toggleTag = (tag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-center">
      {/* Header */}
      <div className="space-y-2">
        <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${proName}`} 
            className="w-16 h-16" 
            alt="Pro" 
          />
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">How was your service?</h2>
        <p className="text-slate-500 text-sm font-medium">Rate your experience with <span className="text-indigo-600 font-bold">{proName}</span></p>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center gap-2 py-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className="transition-transform active:scale-90"
            >
            <Star 
              size={36} 
              fill={(hover || rating) >= star ? "#f59e0b" : "none"} 
              className={(hover || rating) >= star ? "text-amber-500" : "text-slate-200"}
              strokeWidth={2.5}
            />
          </button>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        {
        [1, 2, 3, 4, 5].map((star) => (
            <Star 
              size={36} 
              fill={( rating) >= star ? "#f59e0b" : "none"} 
              className={(  rating) >= star ? "text-amber-500" : "text-slate-200"}
              strokeWidth={2.5}
            />
        ))}
      </div>

        {/* Compliment Tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {complimentTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border-2 ${
              tags.includes(tag) 
              ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100" 
              : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Comment Box */}
      <div className="relative group">
        <textarea
          placeholder="Share more details about the service (optional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-3xl outline-none focus:border-indigo-600 text-sm font-medium transition-all min-h-[100px] resize-none"
        />
        <MessageSquare className="absolute right-4 bottom-4 text-slate-200 group-focus-within:text-indigo-200" size={20} />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => onFinish({ rating, tags, comment })}
          disabled={rating === 0}
          className="w-full bg-indigo-600 disabled:opacity-40 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 transition-all active:scale-95"
        >
          <Send size={18} /> Submit Feedback
        </button>
        <button 
          onClick={() => onFinish(null)}
          className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
        >
          Skip for now
        </button>
      </div>

      {/* Trust Badge */}
      <div className="pt-4 flex items-center justify-center gap-2 opacity-50">
        <ShieldCheck size={14} className="text-slate-400" />
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Anonymous Feedback</span>
      </div>
    </motion.div>
  );
}