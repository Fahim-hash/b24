"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  Trophy, Users, Gamepad2, Timer, 
  ArrowRight, CheckCircle2, MapPin, 
  Calendar, ChevronDown, Terminal,
  ShieldAlert, Crosshair, Fingerprint
} from 'lucide-react';

// --- DYNAMIC CONFIGURATION (Single Source of Truth) ---
const EVENT_CONFIG = {
  eventName: "চব্বিশের Reunion",
  theme: "SQUID EDITION",
  currentCategoryName: "Early Bird", 
  registrationFee: "512 BDT",
  isRegistrationOpen: true,
  tickifyLink: "https://tickify.live/events/backbenchers24", 
  eventDate: "November 1, 2026 00:00:00",
  location: "Dhaka, Bangladesh",
  feeStructure: [
    { label: "Early Bird", fee: "512 BDT", status: "Active", slots: "Limited to 50 Players" },
    { label: "Phase 1", fee: "750 BDT", status: "Upcoming", slots: "Standard Entry" },
    { label: "Phase 2", fee: "1024 BDT", status: "Upcoming", slots: "Late Entry" },
  ]
};

const OVERVIEW_DATA = {
  title: "The Front Man's Invitation",
  subtitle: "PROTOCOL 2024: INITIATED",
  paragraphs: [
    "You are cordially invited to step out of the ordinary and into the ultimate convergence. The SSC '24 cohort is being summoned for a reunion unlike any other—a physical manifestation of our shared history, engineered with surgical precision.",
    "Forget standard get-togethers. This is a highly classified operation wrapped in the nostalgia of our school days, blending high-stakes cinematic aesthetics with the unspoken bond of the BackBenchers.",
    "Survival here doesn't mean life or death; it means securing your legacy, forging ultimate connections, and experiencing the reality we've built for you. The digital frontier meets our academic heritage. Will you accept the card?"
  ]
};

const TIMELINE_DATA = [
  { time: "09:00 AM", title: "Player Infiltration", desc: "Gates open. Identity verification and ID card distribution." },
  { time: "10:30 AM", title: "The Front Man Speaks", desc: "Opening ceremony and briefing on the day's protocols." },
  { time: "11:00 AM", title: "Game 1: Red Light, Green Light", desc: "A nostalgic twist on the classic. Stay perfectly still." },
  { time: "01:30 PM", title: "Ration Distribution", desc: "Lunch break. High-quality catering to refuel the players." },
  { time: "03:00 PM", title: "Game 2: Tug of War", desc: "Strength in unity. Batch vs Batch showcase." },
  { time: "05:30 PM", title: "The Final Node", desc: "Sunset DJ session, prize distribution, and closing cinematic." }
];

const FAQS = [
  { q: "Is the dress code mandatory?", a: "Players are encouraged to wear the official event t-shirt provided at entry. Guards will be in strict uniform." },
  { q: "How does the Tickify pass work?", a: "Once registered via Tickify, you will receive a QR code. This is your digital life-token. Do not lose it." },
  { q: "Are the games physically dangerous?", a: "No. All games are completely safe, adapted for fun and nostalgia. The 'danger' is purely cinematic." }
];

// --- Framer Motion Variants (FIXED TYPE ERROR) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function ReunionSquidEdition() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

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
    <main className="bg-[#020202] min-h-screen text-gray-200 selection:bg-[#ff005a]/40 overflow-x-hidden font-sans">
      
      {/* Background Noise & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ff005a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 pointer-events-none z-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden z-10">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#ff005a]/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[#00f0ff]/5 blur-[180px] rounded-full pointer-events-none" />

        <motion.div 
          initial="hidden" animate="visible" variants={stagger}
          className="container max-w-7xl mx-auto text-center"
        >
          {/* Cyber-Academic Top Bar */}
          <motion.div variants={fadeInUp} className="flex justify-center items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-12 font-mono">
            <span>[ SYSTEM INITIATED ]</span>
            <span className="w-8 h-[1px] bg-[#ff005a]/50" />
            <span>{EVENT_CONFIG.location}</span>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-10 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff005a] to-[#00f0ff] blur-[80px] opacity-20 group-hover:opacity-50 transition-all duration-700" />
            <div className="relative w-full h-full border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md p-4 bg-black/40">
              <Image 
                src="/sq_re.png" 
                alt="Squid Edition Logo" 
                fill 
                className="object-cover p-2 rounded-[1.5rem] grayscale-[0.2] contrast-125"
                priority
              />
              <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none" />
            </div>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl tracking-tighter mb-4 font-black uppercase italic drop-shadow-2xl">
            <span className="text-white">চব্বিশের</span> <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff005a] to-[#ff4d85]">REUNION</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-400 tracking-[0.5em] uppercase text-xs md:text-sm mb-16 font-bold">
            {EVENT_CONFIG.theme} <span className="mx-2 text-[#ff005a]">|</span> Digital Frontier × Physical Manifestation
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 md:gap-10 justify-center mb-16">
            {Object.entries(timeLeft).map(([unit, value], i) => (
              <div key={i} className="flex flex-col items-center relative group">
                <div className="text-4xl md:text-7xl font-light text-white font-mono tracking-tighter">
                  {value < 10 ? `0${value}` : value}
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] mt-4 text-[#ff005a] font-bold">
                  {unit === 'd' ? 'Days' : unit === 'h' ? 'Hours' : unit === 'm' ? 'Mins' : 'Secs'}
                </span>
                <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#ff005a] transition-colors" />
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="animate-bounce flex justify-center opacity-30 mt-10">
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. EVENT OVERVIEW */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] border border-white/10 rounded-[2rem] p-6 relative overflow-hidden bg-white/[0.02]">
                <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#ff005a] rounded-tl-[2rem]" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#00f0ff] rounded-br-[2rem]" />
                
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div className="text-[#ff005a] opacity-50">
                    <Fingerprint size={48} strokeWidth={1} />
                  </div>
                  <div className="text-center space-y-6">
                    <div className="text-7xl text-white/10 font-black tracking-widest flex justify-center gap-4">
                      <span>○</span><span>△</span><span>□</span>
                    </div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 text-left">
                      TARGET: SSC 24 COHORT <br />
                      OBJECTIVE: RE-SYNC <br />
                      STATUS: PENDING ACCEPTANCE
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <h2 className="text-sm font-mono text-[#ff005a] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                  <Terminal size={16} /> {OVERVIEW_DATA.subtitle}
                </h2>
                <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
                  {OVERVIEW_DATA.title}
                </h3>
              </div>
              
              <div className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed">
                {OVERVIEW_DATA.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 flex gap-4">
                <div className="px-4 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Crosshair size={14} className="text-[#00f0ff]" /> Precision Engineered
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. REGISTRATION HUB */}
      <section className="py-32 px-6 relative z-10">
        <div className="container max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative p-8 md:p-16 rounded-[3rem] bg-[#050505] border border-[#ff005a]/20 shadow-[0_0_100px_rgba(255,0,90,0.05)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ff005a]/10 via-transparent to-transparent pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff005a]/10 border border-[#ff005a]/30 mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#ff005a] animate-pulse" />
                  <span className="text-[#ff005a] text-[10px] font-bold uppercase tracking-widest">{EVENT_CONFIG.currentCategoryName} LIVE</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase leading-none italic tracking-tighter text-white">
                  Secure Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">Player Entry</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Synchronize with the BackBencher&apos;s network. Official passes are distributed exclusively via Tickify.
                </p>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-mono text-gray-500">
                  <ShieldAlert size={14} /> Powered by Tickify
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 text-center flex flex-col items-center justify-center relative group hover:border-[#ff005a]/50 transition-colors duration-500">
                <span className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-4">Current Authorization Fee</span>
                <div className="text-6xl font-light text-white mb-2 tracking-tighter">{EVENT_CONFIG.registrationFee}</div>
                <div className="text-[#ff005a] text-[10px] font-bold uppercase tracking-widest mb-10">{EVENT_CONFIG.currentCategoryName} PHASE</div>
                
                <a 
                  href={EVENT_CONFIG.isRegistrationOpen ? EVENT_CONFIG.tickifyLink : "#"}
                  className={`w-full py-6 rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                    EVENT_CONFIG.isRegistrationOpen 
                    ? "bg-white text-black hover:bg-[#ff005a] hover:text-white" 
                    : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {EVENT_CONFIG.isRegistrationOpen ? "Initiate Transfer" : "Phase Closed"}
                    {EVENT_CONFIG.isRegistrationOpen && <ArrowRight className="w-4 h-4" />}
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TIER STRUCTURE & SCHEDULE */}
      <section className="py-32 px-6 border-t border-white/5 relative z-10 bg-black/30">
        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
          <div>
            <div className="mb-12">
              <h2 className="text-sm uppercase tracking-[0.5em] text-[#ff005a] font-mono mb-2">Pricing Nodes</h2>
              <h3 className="text-4xl font-bold uppercase italic tracking-tighter text-white">Access Tiers</h3>
            </div>
            <div className="space-y-4">
              {EVENT_CONFIG.feeStructure.map((tier, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className={`group flex items-center justify-between p-8 rounded-3xl border transition-all duration-500 ${
                    tier.label === EVENT_CONFIG.currentCategoryName 
                    ? "bg-[#ff005a]/5 border-[#ff005a] shadow-[0_0_30px_rgba(255,0,90,0.1)]" 
                    : "bg-white/[0.01] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className="text-2xl font-light text-gray-600 font-mono">0{idx + 1}</div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-widest text-white">{tier.label}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{tier.slots}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-light text-2xl text-white tracking-tighter">{tier.fee}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${tier.status === "Active" ? "text-[#ff005a]" : "text-gray-600"}`}>
                      {tier.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-12">
              <h2 className="text-sm uppercase tracking-[0.5em] text-[#00f0ff] font-mono mb-2">Event Timeline</h2>
              <h3 className="text-4xl font-bold uppercase italic tracking-tighter text-white">The Itinerary</h3>
            </div>
            <div className="relative border-l border-white/10 ml-4 space-y-12">
              {TIMELINE_DATA.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-black border-2 border-gray-500 rounded-full" />
                  <div className="text-[10px] font-mono text-[#00f0ff] mb-2 tracking-widest">{item.time}</div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-[#050505] relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-4">Event Protocols</h2>
            <div className="w-16 h-1 bg-[#ff005a] mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Trophy, title: "Theme Games", desc: "Experience the adrenaline of Squid Game adapted for our reunion safety and fun." },
              { icon: Users, title: "Networking", desc: "Re-sync with friends and build new bridges across the SSC '24 landscape." },
              { icon: Gamepad2, title: "Nostalgia Node", desc: "A cinematic trip back to our academic memories through immersive visuals." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#ff005a]/30 transition-all duration-500 group relative overflow-hidden"
              >
                <item.icon className="text-[#ff005a] mb-8 group-hover:scale-110 transition-transform duration-500" size={40} strokeWidth={1.5} />
                <h3 className="font-bold text-lg uppercase mb-4 tracking-widest text-white">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-32 px-6 border-t border-white/5 relative z-10">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.5em] text-gray-500 font-mono mb-4">Classified Information</h2>
            <h3 className="text-4xl font-bold uppercase italic tracking-tighter text-white">F.A.Q</h3>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-sm md:text-base uppercase tracking-wider text-gray-200">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#ff005a] transition-transform duration-300 ${activeFAQ === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFAQ === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-6 text-gray-400 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center relative z-10 bg-[#020202]">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-8 text-white/20 font-black text-3xl mb-8 tracking-[1em] ml-[1em]">
              ○ △ □
          </div>
          <div className="text-[10px] text-gray-600 uppercase tracking-[0.5em] mb-4 font-mono">
            BackBencher&apos;s 2024 | Digital Frontier
          </div>
          <p className="text-[9px] text-gray-700 uppercase tracking-widest">
            A convergence engineered for the SSC &apos;24 Cohort.
          </p>
        </div>
      </footer>

    </main>
  );
}
