"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Zap, Globe, ArrowRight, Code,
  Clock, ShieldAlert, Calendar, Fingerprint, ChevronRight, Mail
} from 'lucide-react';

// --- Official Links & Credentials ---
const OFFICIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61563223545170",
  instagram: "https://www.instagram.com/backbencher.24_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  email: "mailto:backbenchers.24official@gmail.com"
};

// --- Custom Social Icons with Links ---
const FacebookIcon = () => (
  <a href={OFFICIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#00f0ff] transition-all hover:scale-125 cursor-pointer drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  </a>
);

const InstagramIcon = () => (
  <a href={OFFICIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#00f0ff] transition-all hover:scale-125 cursor-pointer drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  </a>
);

const MailIcon = () => (
  <a href={OFFICIAL_LINKS.email}>
    <Mail size={18} strokeWidth={1.5} className="hover:text-[#00f0ff] transition-all hover:scale-125 cursor-pointer drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" />
  </a>
);

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as const // Fixed: Added 'as const' for TypeScript compliance
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- Sub-Components ---
const Navbar = () => (
  <motion.nav
    initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
    className="fixed top-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
  >
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="relative w-8 h-8 md:w-10 md:h-10 group-hover:rotate-12 transition-transform duration-500">
        <Image src="/b24.png" alt="Logo" fill sizes="40px" className="object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]" />
      </div>
      <span className="font-monument text-white text-[9px] md:text-[10px] tracking-[0.3em] uppercase italic opacity-80 group-hover:opacity-100 group-hover:text-[#00f0ff] transition-all">BackBencher's '24</span>
    </div>
    <div className="hidden lg:flex items-center space-x-12">
      <div className="flex space-x-8 text-gray-500">
        <FacebookIcon />
        <InstagramIcon />
        <MailIcon />
      </div>
      <div className="h-4 w-[1px] bg-white/10" />
      <div className="flex space-x-8 font-satoshi text-[9px] uppercase tracking-[0.4em] text-gray-500">
        {['Origins', 'Reunion_26', 'Roadmap'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="relative hover:text-white transition-colors group py-1">
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00f0ff] group-hover:w-full transition-all duration-300 ease-out" />
          </a>
        ))}
      </div>
    </div>
  </motion.nav>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date("Nov 1, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const difference = target - new Date().getTime();
      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 md:gap-6 justify-center lg:justify-start">
      {Object.entries(timeLeft).map(([unit, value], i) => (
        <div key={i} className="flex flex-col items-center group">
          <div className="relative w-16 h-20 md:w-24 md:h-28 flex items-center justify-center bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 rounded-lg backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover:border-[#00f0ff]/40 transition-colors">
            <span className="font-monument text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 group-hover:to-[#00f0ff] transition-all duration-500">
              {value < 10 ? `0${value}` : value}
            </span>
          </div>
          <span className="mt-4 text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-gray-600 group-hover:text-[#00f0ff] transition-colors">
            {unit === 'd' ? 'Days' : unit === 'h' ? 'Hours' : unit === 'm' ? 'Mins' : 'Secs'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function SSC24PremiumHub() {
  return (
    <main className="bg-[#000000] min-h-screen text-white overflow-hidden selection:bg-[#00f0ff]/30 selection:text-white font-satoshi">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#00f0ff]/10 to-[#7000ff]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 z-20 text-center flex flex-col items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-5xl">
            <motion.div variants={fadeUp} className="flex justify-center mb-16 relative">
              <div className="absolute inset-0 bg-[#00f0ff] blur-[80px] opacity-20 rounded-full" />
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-44 h-44 md:w-52 md:h-52 bg-white/[0.02] p-8 border border-white/10 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden"
              >
                <Image src="/b24.png" alt="SSC 24" fill sizes="208px" className="object-contain p-6" priority />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative mb-8">
              <h1 className="font-monument text-4xl md:text-7xl uppercase tracking-tighter leading-[1.1]">
                THE OFFICIAL HUB OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-[#7000ff] drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                  SSC '24 BATCH
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-5 bg-white text-black font-monument text-[10px] uppercase tracking-[0.3em] hover:bg-[#00f0ff] transition-all flex items-center justify-center group rounded-sm shadow-xl">
                Initialize Access <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
              <a href={OFFICIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-transparent text-white border border-white/20 font-monument text-[10px] uppercase tracking-[0.3em] hover:bg-white/[0.05] transition-all flex items-center justify-center rounded-sm">
                Follow Community
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE MEGA REUNION */}
      <section id="reunion_26" className="py-40 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-2xl">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-monument text-3xl md:text-5xl uppercase tracking-tighter mb-6 text-white">চব্বিশের <br/><span className="text-gray-500">Reunion</span></h2>
              <p className="text-gray-400 text-[11px] leading-relaxed uppercase tracking-widest opacity-90 max-w-xl mx-auto lg:mx-0 italic">
                The ultimate convergence. Post-HSC physical manifestation of our digital network. Synchronizing logistics.
              </p>
            </div>
            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCESS TERMINAL (Verify Section) */}
      <section id="terminal" className="py-32 border-t border-white/[0.05] bg-[#020202] relative">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <Fingerprint size={50} strokeWidth={1} className="mx-auto mb-10 text-[#00f0ff]/60" />
          <h2 className="font-monument text-2xl md:text-3xl mb-6 uppercase tracking-[0.3em]">Verify Identity</h2>
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.5em] mb-12">Enter batch credentials to access restricted nodes.</p>
          
          <div className="flex flex-col sm:flex-row gap-0 rounded-lg overflow-hidden border border-white/10 focus-within:border-[#00f0ff]/50 transition-all">
            <input
              type="text"
              placeholder="SYS_ID / EMAIL"
              className="flex-1 bg-white/[0.02] backdrop-blur-md px-8 py-6 text-[10px] tracking-widest outline-none uppercase font-monument text-[#00f0ff]"
            />
            <button className="bg-white text-black px-12 py-6 font-monument text-[10px] uppercase tracking-widest hover:bg-[#00f0ff] transition-colors">
              Execute
            </button>
          </div>
        </div>
      </section>

      {/* 6. OVERSIZED FOOTER */}
      <footer className="pt-24 pb-12 border-t border-white/[0.05] bg-black relative">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex flex-col items-center gap-12 mb-20">
            <div className="relative w-12 h-12 grayscale hover:grayscale-0 transition-all duration-700">
               <Image src="/b24.png" alt="Logo" fill className="object-contain" />
            </div>
            
            <div className="flex space-x-12 text-gray-500">
               <FacebookIcon />
               <InstagramIcon />
               <MailIcon />
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 space-y-4">
            <p className="text-[7px] uppercase tracking-[1em] text-gray-600">© 2026 BATCH 24 | THE DIGITAL FRONTIER</p>
            <p className="text-[8px] text-[#00f0ff] uppercase tracking-widest opacity-50">Admin: backbenchers.24official@gmail.com</p>
          </div>
        </div>
      </footer>
    </main>
  );
}