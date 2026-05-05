"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Timer, ArrowRight, CheckCircle2, MapPin, Calendar } from 'lucide-react';

const EVENT_CONFIG = {
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

export default function ReunionCinematic() {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);
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
    <main className="bg-[#020202] min-h-screen text-white selection:bg-[#ff005a]/30 overflow-x-hidden font-sans">
      
      {/* Cinematic Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />

      {/* 1. HERO SECTION (IMMERSE) */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6">
        <motion.div style={{ y: yRange }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/60 to-[#020202] z-10" />
          <Image 
            src="/sq_re_2.jpg" 
            alt="Reunion Background" 
            fill 
            className="object-cover opacity-40 grayscale-[0.5] contrast-125"
            priority
          />
        </motion.div>

        <div className="relative z-20 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">
              REUNION <br />
              <span className="text-[#ff005a] drop-shadow-[0_0_30px_rgba(255,0,90,0.4)]">SQUID ED.</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center justify-center gap-6 text-xs md:text-sm tracking-[0.5em] text-gray-400 uppercase"
          >
            <span className="flex items-center gap-2"><Calendar size={14}/> Post-HSC 2026</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="flex items-center gap-2"><MapPin size={14}/> Dhaka, BD</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-[1px] h-12 bg-white" />
        </div>
      </section>

      {/* 2. THE COUNTDOWN (GLASS CARD) */}
      <section className="py-20 relative z-20 -mt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[3rem] p-12 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(timeLeft).map(([unit, value], i) => (
                <div key={i} className="space-y-2">
                  <div className="text-4xl md:text-6xl font-light">{value < 10 ? `0${value}` : value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#ff005a] font-bold">{unit === 'd' ? 'Days' : unit === 'h' ? 'Hours' : unit === 'm' ? 'Minutes' : 'Seconds'}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. REGISTRATION (MINIMALIST CALL TO ACTION) */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              A Convergence of <br /> 
              <span className="text-gray-500 italic">BackBenchers.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Synchronize with the SSC &apos;24 cohort. This is not just a reunion; it&apos;s a digital-physical manifestation of our history.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-widest">○ △ □ PLAYER 2024</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff005a] to-[#00f0ff] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-[#050505] border border-white/10 p-10 rounded-[2rem] flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-4">Current Entry Pass</span>
              <div className="text-6xl font-black mb-2">{EVENT_CONFIG.registrationFee}</div>
              <div className="text-[#ff005a] text-xs uppercase tracking-widest mb-10 font-bold">{EVENT_CONFIG.currentCategoryName} PHASE</div>
              
              <a 
                href={EVENT_CONFIG.isRegistrationOpen ? EVENT_CONFIG.tickifyLink : "#"}
                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] font-bold transition-all ${
                  EVENT_CONFIG.isRegistrationOpen 
                  ? "bg-white text-black hover:bg-[#ff005a] hover:text-white" 
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
                }`}
              >
                {EVENT_CONFIG.isRegistrationOpen ? "Reserve Entry" : "Phase Closed"}
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TIER SYSTEM (CLEAN LIST) */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className="text-sm uppercase tracking-[0.6em] text-gray-500">Tier Access Structure</h3>
            <div className="h-[1px] w-12 bg-[#ff005a]" />
          </div>

          <div className="space-y-4">
            {EVENT_CONFIG.feeStructure.map((tier, idx) => (
              <div 
                key={idx}
                className={`group flex items-center justify-between p-8 rounded-3xl border transition-all duration-500 ${
                  tier.label === EVENT_CONFIG.currentCategoryName 
                  ? "bg-white/[0.02] border-[#ff005a] shadow-[0_0_40px_rgba(255,0,90,0.1)]" 
                  : "border-white/5 opacity-40 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-8">
                  <span className="text-xs font-mono text-gray-600">0{idx + 1}</span>
                  <div>
                    <h4 className="text-xl font-bold uppercase tracking-tight">{tier.label}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-[#ff005a] mt-1">{tier.status}</p>
                  </div>
                </div>
                <div className="text-2xl font-light tracking-tighter">{tier.fee}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] uppercase tracking-[1em]">BackBencher&apos;s 2024 • Cinematic Frontier</p>
      </footer>

    </main>
  );
}
