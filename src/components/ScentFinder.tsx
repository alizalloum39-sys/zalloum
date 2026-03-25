import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Loader2, Droplets } from 'lucide-react';
import { getScentRecommendation } from '../services/geminiService';
import { ScentRecommendation } from '../types';

export default function ScentFinder() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ScentRecommendation | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const result = await getScentRecommendation(input);
      setRecommendation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-emerald-deep text-off-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-champagne blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-champagne blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Digital Sommelier</h2>
          <p className="text-xl text-off-white/70 max-w-2xl mx-auto">
            Tell us a vibe, a memory, or an emotion. Our AI will find your signature Zalloum scent.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'I want to feel powerful at a wedding' or 'A rainy morning in Amman'"
            className="w-full bg-white/10 border border-white/20 rounded-full py-6 px-8 text-xl focus:outline-none focus:ring-2 focus:ring-gold-champagne transition-all placeholder:text-white/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-gold-champagne text-emerald-deep px-8 rounded-full font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? 'Consulting...' : 'Find My Scent'}
          </button>
        </form>

        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark p-8 rounded-3xl border border-gold-champagne/30"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 text-center md:text-left">
                <span className="text-gold-champagne uppercase tracking-widest text-sm font-bold mb-2 block">Your Recommendation</span>
                <h3 className="text-4xl font-serif mb-4">{recommendation.recommendedScent}</h3>
                <p className="text-lg italic text-off-white/80 leading-relaxed mb-6">
                  "{recommendation.emotionalWhy}"
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6 mb-8">
                  <div className="text-center">
                    <span className="block text-xs uppercase tracking-tighter opacity-50">Sillage</span>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < recommendation.sillageLevel ? 'bg-gold-champagne' : 'bg-white/20'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <button className="bg-gold-champagne text-emerald-deep px-8 py-4 rounded-full font-bold hover:bg-white transition-colors">
                  Order 2ml Trial Vial
                </button>
              </div>
              <div className="w-48 h-64 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <div className="text-gold-champagne text-center">
                  <Droplets size={48} className="mx-auto mb-2 opacity-50" />
                  <span className="text-xs uppercase tracking-widest">Digital Sample</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
