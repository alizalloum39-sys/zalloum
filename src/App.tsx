import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { PERFUMES } from './types';
import NotePyramid from './components/NotePyramid';
import ScentFinder from './components/ScentFinder';
import ConversionStack from './components/ConversionStack';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Menu className="text-off-white cursor-pointer" />
        <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-bold text-off-white/70">
          <span className="hover:text-gold-champagne cursor-pointer transition-colors">Collections</span>
          <span className="hover:text-gold-champagne cursor-pointer transition-colors">Heritage</span>
          <span className="hover:text-gold-champagne cursor-pointer transition-colors">Sommelier</span>
        </div>
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-3xl font-serif text-gold-champagne tracking-tighter">Zalloum</h1>
      </div>

      <div className="flex items-center gap-6 text-off-white">
        <Search size={20} className="cursor-pointer hover:text-gold-champagne transition-colors" />
        <User size={20} className="hidden md:block cursor-pointer hover:text-gold-champagne transition-colors" />
        <div className="relative cursor-pointer group">
          <ShoppingCart size={20} className="group-hover:text-gold-champagne transition-colors" />
          <span className="absolute -top-2 -right-2 bg-gold-champagne text-emerald-deep text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Placeholder for 4K Video */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/luxury/1920/1080?blur=2" 
            className="w-full h-full object-cover scale-105"
            alt="Luxury Background"
          />
          <div className="absolute inset-0 bg-emerald-deep/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-gold-champagne uppercase tracking-[0.5em] text-sm font-bold mb-6 block">
              Est. 1986 | Jordan & Palestine
            </span>
            <h1 className="text-6xl md:text-9xl font-serif text-off-white mb-8 leading-tight">
              Zalloum <br />
              <span className="italic text-gold-champagne">Perfume</span>
            </h1>
            <div className="glass p-8 rounded-3xl max-w-2xl mx-auto">
              <p className="text-xl text-off-white font-light leading-relaxed">
                Heritage Middle Eastern luxury meets modern minimalism. 
                Experience the digital sillage of our Private Collection.
              </p>
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-gold-champagne text-emerald-deep px-10 py-4 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105">
                  Explore Collection
                </button>
                <button className="border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                  Our Legacy
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-champagne"
        >
          <div className="w-px h-12 bg-gold-champagne/30 mx-auto" />
        </motion.div>
      </section>

      {/* Scent Finder Section */}
      <ScentFinder />

      {/* Product Showcase */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl font-serif mb-6">The Private Collection</h2>
            <p className="text-lg text-emerald-deep/70">
              Each fragrance in our Private Collection is a chapter of our 40-year legacy, 
              hand-crafted with the rarest ingredients from the Levant and beyond.
            </p>
          </div>
          <button className="text-gold-champagne font-bold uppercase tracking-widest flex items-center gap-2 group">
            View All Products <div className="w-8 h-px bg-gold-champagne transition-all group-hover:w-12" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {PERFUMES.map((perfume) => (
            <motion.div 
              key={perfume.id}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-6">
                <img 
                  src={perfume.image} 
                  alt={perfume.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-off-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                  {perfume.collection}
                </div>
                <button className="absolute bottom-6 left-6 right-6 bg-emerald-deep text-off-white py-4 rounded-2xl font-bold opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart — ${perfume.price}
                </button>
              </div>
              <h3 className="text-2xl font-serif mb-2">{perfume.name}</h3>
              <p className="text-emerald-deep/60 mb-6 line-clamp-2">{perfume.description}</p>
              
              {/* Interactive Note Pyramid for each product */}
              <div className="border-t border-emerald-deep/10 pt-6">
                <NotePyramid notes={perfume.notes} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / Legacy */}
      <footer className="bg-emerald-deep text-off-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-serif mb-6 text-gold-champagne">Zalloum</h2>
            <p className="text-lg text-off-white/60 max-w-md leading-relaxed">
              Since 1986, we have been the custodians of Middle Eastern fragrance heritage. 
              Our journey from a small shop in Amman to a global luxury house is built on 
              authenticity, family values, and the pursuit of the perfect sillage.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-gold-champagne">Collections</h4>
            <ul className="space-y-4 text-off-white/60">
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Private Collection</li>
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Heritage Series</li>
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Oud Essentials</li>
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Floral Waters</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-gold-champagne">Experience</h4>
            <ul className="space-y-4 text-off-white/60">
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Digital Sommelier</li>
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Scent Workshops</li>
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Bespoke Fragrance</li>
              <li className="hover:text-gold-champagne cursor-pointer transition-colors">Store Locator</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-off-white/40 uppercase tracking-widest">
          <p>© 2026 Zalloum Perfume. All Rights Reserved.</p>
          <div className="flex gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Shipping & Returns</span>
          </div>
        </div>
      </footer>

      {/* Conversion Stack */}
      <ConversionStack />
    </div>
  );
}
