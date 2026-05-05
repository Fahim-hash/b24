"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Trophy, Users, Gamepad2, Timer, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';

// --- DYNAMIC CONFIGURATION (Single Source of Truth) ---
const EVENT_CONFIG = {
  eventName: "চব্বিশের Reunion (Squid Edition)",
  currentCategoryName: "Early Bird", 
  registrationFee: "512 BDT",
  isRegistrationOpen: true,
  tickifyLink: "https://tickify.live/events/backbenchers24", 
  eventDate: "November 1, 2026 00:00:00",
  feeStructure: [
    { label: "Early Bird", fee: "512 BDT", status: "Active" },
    { label: "Phase 1", fee: "750 BDT", status: "Upcoming" },
    { label: "Phase 2", fee: "1024 BDT", status: "Upcoming" },
  ]
};

// --- Framer Motion Variants (Fixed for TypeScript/Vercel) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as any // Fixed the type error
    } 
  }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function ReunionSquidEdition() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(EVENT_CONFIG.eventDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#ff005a]/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#ff005a]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#00f0ff]/5 blur-[150px] rounded-full" />

        <motion.div 
          initial="hidden" animate="visible" variants={stagger}
          className="container max-w-6xl mx-auto text-center z-10"
        >
          <motion.div variants={fadeInUp} className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-10 group">
            <div className="absolute inset-0 bg-[#ff005a] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-full h-full border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm p-4">
              <Image 
                src="/sq_re_2.jpg" 
                alt="Squid Edition Logo" 
                fill 
                className="object-cover p-2 rounded-xl"
                priority
              />
            </div>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-3xl md:text-6xl uppercase tracking-tighter mb-6 font-bold">
            <span className="text-[#ff005a]">চব্বিশের</span> REUNION
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-400 tracking-[0.4em] uppercase text-[10px] md:text-xs mb-12">
            The Digital Frontier × Physical Manifestation
          </motion.p>

          <motion.div variants={fadeInUp} className="flex gap-4 md:gap-8 justify-center mb-16">
            {Object.entries(timeLeft).map(([unit, value], i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl md:text-5xl font-mono text-white border-b-2 border-[#ff005a]/50 pb-2">
                  {value < 10 ? `0${value}` : value}
                </div>
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest mt-3 text-gray-500">
                  {unit === 'd' ? 'Days' : unit === 'h' ? 'Hours' : unit === 'm' ? 'Mins' : 'Secs'}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 2. REGISTRATION HUB */}
      <section className="py-24 px-6 relative">
        <div className="container max-w-4xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="relative p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-2xl overflow-hidden"
          >
            <div className="absolute top-5 right-10 text-white/5 font-bold text-7xl select-none">○ △ □</div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff005a]/10 border border-[#ff005a]/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#ff005a] animate-pulse" />
                  <span className="text-[#ff005a] text-[10px] font-bold uppercase tracking-widest">{EVENT_CONFIG.currentCategoryName} LIVE</span>
                </div>
                <h2 className="text-4xl font-bold mb-4 uppercase leading-tight italic">Secure Your <br /> Player Entry</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Join the most anticipated convergence of the SSC &apos;24 batch. 
                  Synchronize with your peers in a theme-based environment.
                </p>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
                <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-2">Registration Fee</span>
                <div className="text-5xl font-bold text-white mb-8">{EVENT_CONFIG.registrationFee}</div>
                
                <a 
                  href={EVENT_CONFIG.isRegistrationOpen ? EVENT_CONFIG.tickifyLink : "#"}
                  className={`w-full py-5 rounded-xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center transition-all ${
                    EVENT_CONFIG.isRegistrationOpen 
                    ? "bg-[#ff005a] text-white hover:bg-[#ff005a]/80 shadow-[0_0_30px_rgba(255,0,90,0.3)]" 
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {EVENT_CONFIG.isRegistrationOpen ? "Register Now" : "Registration Closed"}
                  {EVENT_CONFIG.isRegistrationOpen && <ArrowRight className="ml-3 w-4 h-4" />}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. FEE STRUCTURE TABLE */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl uppercase tracking-widest mb-4 italic font-bold">Access Tiers</h2>
            <div className="h-1 w-20 bg-[#ff005a] mx-auto" />
          </div>

          <div className="grid gap-4">
            {EVENT_CONFIG.feeStructure.map((tier, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center justify-between p-6 md:p-8 rounded-2xl border transition-all ${
                  tier.label === EVENT_CONFIG.currentCategoryName 
                  ? "bg-[#ff005a]/5 border-[#ff005a] shadow-[0_0_20px_rgba(255,0,90,0.1)]" 
                  : "bg-white/[0.02] border-white/5 opacity-60"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${tier.label === EVENT_CONFIG.currentCategoryName ? "border-[#ff005a] text-[#ff005a]" : "border-gray-700 text-gray-700"}`}>
                    {tier.status === "Active" ? <CheckCircle2 size={20} /> : <Timer size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase">{tier.label}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{tier.status}</p>
                  </div>
                </div>
                <div className="font-bold text-lg text-white">{tier.fee}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EVENT HIGHLIGHTS */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Trophy, title: "Theme Games", desc: "Experience the adrenaline of Squid Game adapted for our reunion safety and fun." },
              { icon: Users, title: "Networking", desc: "Re-sync with friends and build new bridges across the HSC '26 landscape." },
              { icon: Gamepad2, title: "Nostalgia Node", desc: "A cinematic trip back to our SSC '24 memories through immersive visuals." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-[#ff005a]/30 transition-colors group"
              >
                <item.icon className="text-[#ff005a] mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-bold text-xs uppercase mb-4 tracking-widest">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed uppercase">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="text-[10px] text-gray-600 uppercase tracking-[1em] mb-4">
          BackBencher&apos;s &apos;24 | Digital Frontier
        </div>
        <div className="flex justify-center gap-6 text-white/20 font-bold text-xl">
           ○ △ □
        </div>
      </footer>

    </main>
  );
}
