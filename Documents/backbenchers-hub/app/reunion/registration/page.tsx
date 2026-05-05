"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  User, Mail, Phone, School, Hash, ArrowRight, 
  CheckCircle2, ShieldCheck, GraduationCap, 
  AlertCircle, Globe, Terminal, Cpu, Zap
} from 'lucide-react';

// --- Framer Motion Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.3 } 
  }
};

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', 
    batch: 'SSC 24', board: 'Dhaka',
    school: '', trxId: '', senderNumber: '',
    tshirtSize: 'L'
  });

  useEffect(() => setMounted(true), []);

  const schools = [
    "Willes Little Flower School & College",
    "Motijheel Ideal School & College",
    "Viqarunnisa Noon School & College",
    "Dhaka Residential Model College",
    "St. Joseph Higher Secondary School",
    "Holy Cross College",
    "Notre Dame College",
    "Adamjee Cantonment College",
    "Govt. Science College",
    "Dhaka City College",
    "Other"
  ];

  const boards = ["Dhaka", "Chittagong", "Rajshahi", "Comilla", "Barisal", "Sylhet", "Dinajpur", "Jessore", "Mymensingh", "Madrasah", "Technical"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic Validation
    if (formData.phone.length < 11 || formData.senderNumber.length < 11) {
      setError("Please enter a valid 11-digit phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Firebase Error:", err);
      setError(err.message || "Connection protocol failed. Check Firestore Rules.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-[#0a0a0a] p-12 rounded-[3.5rem] border border-[#ff005a]/30 shadow-[0_0_100px_rgba(255,0,90,0.15)] text-center max-w-xl"
        >
          <div className="w-24 h-24 bg-[#ff005a] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_#ff005a]">
            <CheckCircle2 className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-6 uppercase italic">Registration Logged</h1>
          <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
            SYSTEM STATUS: <span className="text-[#ff005a]">SUCCESS</span><br />
            TRANSACTION ID: <span className="text-white underline">{formData.trxId}</span><br />
            Verification email will be dispatched to {formData.email}.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#ff005a] hover:text-white transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#ff005a] selection:text-white">
      {/* --- HUD/Navigation --- */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ff005a] rounded-lg rotate-45 flex items-center justify-center">
            <Zap className="text-white -rotate-45" size={16} />
          </div>
          <span className="font-black tracking-tighter text-xl">B24.</span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-[10px] tracking-[0.3em] uppercase">
          <a href="#" className="hover:text-[#ff005a] transition-colors">Node_01</a>
          <a href="#" className="hover:text-[#ff005a] transition-colors">Database</a>
          <a href="#" className="hover:text-[#ff005a] transition-colors">Support</a>
        </div>
      </nav>

      {/* --- Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#ff005a]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      <div className="container max-w-4xl mx-auto pt-32 pb-20 px-6 relative z-10">
        {/* --- Header Section --- */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 text-[#ff005a] font-mono text-xs mb-4">
              <Terminal size={14} /> <span>STATUS: ONLINE_ENTRY_v2.0</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]">
              MEGA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff005a] to-[#ff4d8d]">REUNION</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest leading-loose">
              Batch: SSC 2024 / HSC 2026<br />
              Willes Little Flower School<br />
              & College Alumni Network
            </p>
          </div>
        </motion.div>

        {/* --- Main Form --- */}
        <motion.div 
          variants={containerVariants} initial="hidden" animate="visible"
          className="bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8">
            <Cpu className="text-white/5" size={120} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* 1. Basic Info Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="text-[#ff005a] font-black italic">01.</span>
                <h3 className="font-black uppercase tracking-widest text-sm">Personal Credentials</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label-style">Legal Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input required type="text" placeholder="SYED FAHIM MUDDASIR" className="input-style"
                      onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-style">Email Node</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input required type="email" placeholder="fahim@example.com" className="input-style"
                      onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-style">Contact Frequency</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input required type="tel" placeholder="01XXXXXXXXX" className="input-style"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-style">T-Shirt Dimension</label>
                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <select className="input-style appearance-none" onChange={(e) => setFormData({...formData, tshirtSize: e.target.value})}>
                      <option value="M">M (Medium)</option>
                      <option value="L">L (Large)</option>
                      <option value="XL">XL (Extra Large)</option>
                      <option value="XXL">XXL (Double Extra)</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Academic Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="text-[#ff005a] font-black italic">02.</span>
                <h3 className="font-black uppercase tracking-widest text-sm">Academic History</h3>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <select required className="input-style appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, school: e.target.value})}>
                    <option value="">SELECT ALMA MATER</option>
                    {schools.map((s) => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <select className="input-style appearance-none" onChange={(e) => setFormData({...formData, batch: e.target.value})}>
                      <option value="SSC 24">BATCH: SSC &apos;24</option>
                      <option value="HSC 26">BATCH: HSC &apos;26</option>
                    </select>
                  </div>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <select className="input-style appearance-none" onChange={(e) => setFormData({...formData, board: e.target.value})}>
                      {boards.map(b => <option key={b} value={b}>{b.toUpperCase()} BOARD</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Payment Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="text-[#ff005a] font-black italic">03.</span>
                <h3 className="font-black uppercase tracking-widest text-sm">Financial Verification</h3>
              </div>

              <div className="bg-[#ff005a]/5 border border-[#ff005a]/20 p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-white font-black uppercase italic">Mobile Transaction</h4>
                  <p className="text-gray-400 font-mono text-[11px] leading-loose uppercase">
                    Receiver Number: <span className="text-[#ff005a] font-bold">01XXXXXXXXX</span><br />
                    Amount: <span className="text-white underline">500.00 BDT</span><br />
                    Reference: <span className="text-white font-bold">B24</span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bkash_logo.png/220px-Bkash_logo.png" className="w-8 opacity-70 grayscale hover:grayscale-0 transition-all" alt="bkash" />
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Nagad_logo.png/220px-Nagad_logo.png" className="w-8 opacity-70 grayscale hover:grayscale-0 transition-all" alt="nagad" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label-style">Sender Number</label>
                  <input required type="tel" placeholder="01XXXXXXXXX" className="input-style border-[#ff005a]/20"
                    onChange={(e) => setFormData({...formData, senderNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="label-style text-[#ff005a]">Transaction ID (TXN)</label>
                  <input required type="text" placeholder="AX20J0L..." className="input-style border-[#ff005a]/40 text-[#ff005a] font-black uppercase"
                    onChange={(e) => setFormData({...formData, trxId: e.target.value})} />
                </div>
              </div>
            </section>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-500 text-xs font-mono"
                >
                  <AlertCircle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button 
              type="submit" disabled={isSubmitting}
              className="group relative w-full overflow-hidden py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] transition-all duration-700 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-[#ff005a] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center justify-center gap-4">
                {isSubmitting ? "ENCRYPTING DATA..." : "INITIATE REGISTRATION"} <ArrowRight size={20} />
              </span>
            </button>
          </form>
        </motion.div>

        {/* --- Footer Info --- */}
        <footer className="mt-20 text-center space-y-4">
          <div className="flex justify-center gap-6 text-gray-600">
            <Globe size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Hash size={20} className="hover:text-white cursor-pointer transition-colors" />
            <ShieldCheck size={20} className="hover:text-white cursor-pointer transition-colors" />
          </div>
          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em]">
            &copy; 2026 BackBencher&apos;s 24 . All rights reserved . Dev by Fahim Muddasir
          </p>
        </footer>
      </div>

      <style jsx>{`
        .label-style {
          display: block;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #444;
          margin-left: 0.5rem;
        }
        .input-style {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 1.25rem;
          padding: 1.25rem 1.25rem 1.25rem 3.5rem;
          outline: none;
          color: white;
          font-size: 0.85rem;
          font-family: var(--font-mono, monospace);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .input-style:focus {
          border-color: #ff005a;
          background: rgba(255, 0, 90, 0.03);
          box-shadow: 0 0 30px rgba(255, 0, 90, 0.05);
        }
        select.input-style {
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
