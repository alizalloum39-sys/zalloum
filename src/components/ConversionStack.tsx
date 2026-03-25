import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Bell, ArrowRight } from 'lucide-react';

export default function ConversionStack() {
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState('');

  const notifications = [
    'Someone in Amman just purchased Royal Oud.',
    'A customer in Dubai just ordered the Private Collection.',
    'Signature Travel Atomizer is trending in Doha.',
    'New stock of Desert Musk just arrived.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNotification(notifications[Math.floor(Math.random() * notifications.length)]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Social Proof Ticker */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-24 left-6 z-50 glass-dark px-6 py-4 rounded-2xl flex items-center gap-4 text-off-white shadow-2xl border border-gold-champagne/20"
          >
            <div className="bg-gold-champagne p-2 rounded-full">
              <Bell size={16} className="text-emerald-deep" />
            </div>
            <p className="text-sm font-medium">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Mobile Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 glass-dark border-t border-white/10 p-4 flex gap-4">
        <button className="flex-1 bg-white/10 text-off-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
          Try Sample
        </button>
        <button className="flex-[2] bg-gold-champagne text-emerald-deep py-4 rounded-xl font-bold flex items-center justify-center gap-2">
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>

      {/* Smart Cross-Sell (Simulated as a floating hint) */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40 space-y-4">
        <motion.div 
          whileHover={{ x: -10 }}
          className="glass-dark p-4 rounded-2xl border border-gold-champagne/20 w-48 cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold">Limited Offer</span>
          <p className="text-xs text-off-white mt-1">Add 100ml, get 20% off Travel Atomizer</p>
          <div className="mt-2 flex items-center text-gold-champagne text-[10px] font-bold">
            Learn More <ArrowRight size={10} className="ml-1" />
          </div>
        </motion.div>
      </div>
    </>
  );
}
