"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Trophy, Users, Gamepad2, Timer, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';

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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
  }
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
    <main className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#ff1177]/40 overflow-x-hidden relative">
      {/* Background Overlay: Grainy Texture & Large Symbols */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-50" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-20 -left-20 text-[40rem] font-bold text-white">○</div>
        <div className="absolute bottom-0 right-0 text-[30rem] font-bold text-[#ff1177]">△</div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <motion.div 
          initial="hidden" animate="visible"
          className="container max-w-6xl mx-auto text-center z-10"
        >
          <motion.div variants={fadeInUp} className="relative w-72 h-72 md:w-96 md:h-96 mx-auto mb-10">
            {/* Pink Glow Behind Image */}
            <div className="absolute inset-0 bg-[#ff1177] blur-[100px] opacity-25 animate-pulse" />
            <div className="relative w-full h-full border-4 border-[#ff1177] rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,17,119,0.4)]">
              <Image 
                src="/sq_re_2.jpg" 
                alt="Squid Edition Logo" 
                fill 
                className="object-cover scale-110"
                priority
              />
            </div>
            {/* Squid Symbols */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#ff1177] px-6 py-2 rounded-sm font-bold tracking-[1em] text-black">○△□</div>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl uppercase font-black tracking-tighter mb-4 italic">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">চব্বিশের</span> <br />
            <span className="text-[#ff1177] drop-shadow-[0_0_20px_rgba(255,17,119,0.8)]">REUNION</span>
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="flex gap-4 md:gap-6 justify-center mt-12 bg-black/60 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            {Object.entries(timeLeft).map(([unit, value], i) => (
              <div key={i} className="flex flex-col items-center min-w-[70px]">
                <div className="text-3xl md:text-6xl font-black text-[#00ffc3] font-mono">
                  {value < 10 ? `0${value}` : value}
                </div>
                <span className="text-[9px] uppercase tracking-widest mt-2 text-gray-400">{unit}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 2. REGISTRATION HUB (Player Card Style) */}
      <section className="py-24 px-6 relative">
        <div className="container max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-[#1a1a1a] border-l-[12px] border-[#ff1177] rounded-r-3xl overflow-hidden shadow-2xl relative"
          >
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <div className="grid lg:grid-cols-5 gap-0 relative z-10">
              <div className="lg:col-span-3 p-10 md:p-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#ff1177] text-black px-4 py-1 font-black text-sm">PLAYER 2024</div>
                  <div className="text-gray-500 tracking-[0.5em] font-bold">○ △ □</div>
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase leading-none">DO YOU <br /> <span className="text-[#ff1177]">PLAY?</span></h2>
                <div className="space-y-4 border-l-2 border-[#00ffc3]/30 pl-6">
                  <p className="text-gray-400 text-lg uppercase tracking-tight">Status: <span className="text-[#00ffc3]">{EVENT_CONFIG.isRegistrationOpen ? 'Ready' : 'Eliminated'}</span></p>
                  <p className="text-gray-400 text-lg uppercase tracking-tight">Batch: <span className="text-white">SSC &apos;24</span></p>
                </div>
              </div>

              <div className="lg:col-span-2 bg-[#ff1177] p-10 flex flex-col items-center justify-center text-black">
                <span className="uppercase font-black tracking-widest text-sm opacity-70 mb-2">Entry Fee</span>
                <div className="text-6xl font-black mb-10 italic">{EVENT_CONFIG.registrationFee}</div>
                <a 
                  href={EVENT_CONFIG.isRegistrationOpen ? EVENT_CONFIG.tickifyLink : "#"}
                  className="w-full py-6 bg-black text-[#ff1177] font-black text-xl uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-4 group"
                >
                  {EVENT_CONFIG.isRegistrationOpen ? "JOIN GAME" : "CLOSED"}
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ACCESS TIERS (Gritty Style) */}
      <section className="py-24 px-6 bg-[#0c0c0c]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-center font-black text-3xl uppercase tracking-[0.5em] mb-16 text-gray-600">The Tiers</h2>
          <div className="space-y-6">
            {EVENT_CONFIG.feeStructure.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-1 border-2 transition-all ${
                  tier.label === EVENT_CONFIG.currentCategoryName 
                  ? "border-[#ff1177] bg-[#ff1177]/5" 
                  : "border-white/5 bg-transparent"
                }`}
              >
                <div className="flex items-center justify-between p-6 bg-[#0a0a0a]">
                  <div className="flex items-center gap-6">
                    <div className={`text-4xl font-black ${tier.label === EVENT_CONFIG.currentCategoryName ? "text-[#ff1177]" : "text-gray-800"}`}>
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-xl uppercase italic">{tier.label}</h3>
                      <span className={`text-[10px] uppercase font-bold tracking-[0.3em] ${tier.label === EVENT_CONFIG.currentCategoryName ? "text-[#00ffc3]" : "text-gray-600"}`}>
                        {tier.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white/90">{tier.fee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHTS (Brutalist Blocks) */}
      <section className="py-32 px-6">
        <div className="container max-w-6xl mx-auto grid md:grid-cols-3 gap-0">
          {[
            { title: "THE GAMES", desc: "Red Light, Green Light - with a reunion twist.", color: "#ff1177" },
            { title: "THE SQUAD", desc: "Batch of '24. No one gets left behind.", color: "#00ffc3" },
            { title: "THE REWARD", desc: "Memories worth more than 45.6 Billion.", color: "#ffffff" }
          ].map((item, i) => (
            <div key={i} className="p-12 border border-white/5 hover:bg-white/[0.02] transition-colors">
              <h3 className="text-3xl font-black mb-6" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-gray-500 uppercase font-bold text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <div className="text-6xl mb-8 font-black text-white/5">○ △ □</div>
        <p className="text-xs uppercase tracking-[1em] text-gray-700">BackBencher&apos;s 2024</p>
      </footer>
    </main>
  );
}
