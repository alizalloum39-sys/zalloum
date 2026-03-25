import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Wind, Droplets, Flame } from 'lucide-react';

interface NotePyramidProps {
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export default function NotePyramid({ notes }: NotePyramidProps) {
  const [activeLayer, setActiveLayer] = useState<'top' | 'heart' | 'base' | null>(null);

  const layers = [
    { id: 'top', name: 'Top Notes', icon: Wind, data: notes.top, color: 'text-gold-champagne' },
    { id: 'heart', name: 'Heart Notes', icon: Droplets, data: notes.heart, color: 'text-emerald-deep' },
    { id: 'base', name: 'Base Notes', icon: Flame, data: notes.base, color: 'text-emerald-deep' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 py-12">
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Base */}
          <motion.path
            d="M 10 90 L 90 90 L 75 60 L 25 60 Z"
            fill={activeLayer === 'base' ? '#D4AF37' : '#043927'}
            className="cursor-pointer transition-colors duration-300"
            onMouseEnter={() => setActiveLayer('base')}
            whileHover={{ scale: 1.05 }}
          />
          {/* Heart */}
          <motion.path
            d="M 25 60 L 75 60 L 65 35 L 35 35 Z"
            fill={activeLayer === 'heart' ? '#D4AF37' : '#043927'}
            className="cursor-pointer transition-colors duration-300"
            onMouseEnter={() => setActiveLayer('heart')}
            whileHover={{ scale: 1.05 }}
          />
          {/* Top */}
          <motion.path
            d="M 35 35 L 65 35 L 50 10 Z"
            fill={activeLayer === 'top' ? '#D4AF37' : '#043927'}
            className="cursor-pointer transition-colors duration-300"
            onMouseEnter={() => setActiveLayer('top')}
            whileHover={{ scale: 1.05 }}
          />
        </svg>
      </div>

      <div className="flex-1 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeLayer ? (
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                {React.createElement(layers.find(l => l.id === activeLayer)!.icon, { className: "w-6 h-6 text-gold-champagne" })}
                <h3 className="text-2xl font-serif uppercase tracking-widest">
                  {layers.find(l => l.id === activeLayer)!.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {layers.find(l => l.id === activeLayer)!.data.map((note, i) => (
                  <span key={i} className="px-4 py-2 bg-emerald-deep text-off-white rounded-full text-sm font-medium">
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-emerald-deep/70 italic">
                {activeLayer === 'top' && "The first impression, light and volatile."}
                {activeLayer === 'heart' && "The core soul of the fragrance, emerging after minutes."}
                {activeLayer === 'base' && "The lasting heritage that settles on the skin for hours."}
              </p>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-emerald-deep/40 italic">
              Hover over the pyramid to explore the digital sillage...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
