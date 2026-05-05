"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  User, Mail, Phone, School, Hash, ArrowRight, 
  CheckCircle2, ShieldCheck, GraduationCap, 
  AlertCircle, Globe, Terminal, Cpu, Zap
} from 'lucide-react';

// --- FIXED Framer Motion Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const containerVariants: Variants = {
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-[#0a0a0a] p-12 rounded-[3.5rem] border border-[#ff005a]/30 shadow-[0_0_100px_rgba(255,0,90,0.15)] text-center max-w-xl"
        >
          <div className="w-24 h-24 bg-[#ff005a] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_#ff005a]">
            <CheckCircle2 className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-6 uppercase italic">Entry Secured</h1>
          <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8 uppercase">
            Status: <span className="text-[#ff005a]">Pending Verification</span><br />
            TRX_ID: <span className="text-white underline">{formData.trxId}</span><br />
            Ticket will be sent to: {formData.email}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#ff005a] hover:text-white transition-all duration-300"
          >
            New Registration
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#ff005a] selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ff005a] rounded-lg rotate-45 flex items-center justify-center">
            <Zap className="text-white -rotate-45" size={16} />
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase italic">B24 Hub</span>
        </div>
        <div className="hidden md:flex gap-10 font-mono text-[10px] tracking-[0.4em] uppercase text-gray-400">
          <span className="text-[#ff005a] border-b border-[#ff005a]">Registration</span>
          <span className="hover:text-white cursor-help">Security</span>
          <span className="hover:text-white cursor-help">Archives</span>
        </div>
      </nav>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#ff005a]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      <div className="container max-w-4xl mx-auto pt-32 pb-24 px-6 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-20">
          <div className="flex items-center gap-3 text-[#ff005a] font-mono text-[10px] tracking-[0.3em] mb-4">
            <Terminal size={12} /> <span>INITIALIZING_PROTOCOL_SSC_24</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]">
            MEGA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff005a] to-[#ff4d8d]">REUNION</span>
          </h1>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="bg-[#0a0a0a]/70 border border-white/10 backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-16 shadow-2xl relative"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Cpu size={140} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-14">
            {/* Identity Node */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <span className="text-[#ff005a] font-black italic font-mono text-xl">01.</span>
                <h3 className="font-black uppercase tracking-[0.3em] text-xs text-gray-300">Identity Nodes</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label-style">Legal Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff005a] transition-colors" size={18} />
                    <input required type="text" placeholder="SYED FAHIM MUDDASIR" className="input-style"
                      onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="label-style">Email Channel</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff005a] transition-colors" size={18} />
                    <input required type="email" placeholder="fahim@domain.com" className="input-style"
                      onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="label-style">Phone Frequency</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff005a] transition-colors" size={18} />
                    <input required type="tel" placeholder="01XXXXXXXXX" className="input-style"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="label-style">T-Shirt Specification</label>
                  <div className="relative group">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff005a] transition-colors" size={18} />
                    <select className="input-style appearance-none" onChange={(e) => setFormData({...formData, tshirtSize: e.target.value})}>
                      <option value="M">M (MEDIUM)</option>
                      <option value="L">L (LARGE)</option>
                      <option value="XL">XL (EXTRA LARGE)</option>
                      <option value="XXL">XXL (DOUBLE EXTRA)</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Academic Node */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <span className="text-[#ff005a] font-black italic font-mono text-xl">02.</span>
                <h3 className="font-black uppercase tracking-[0.3em] text-xs text-gray-300">Academic Background</h3>
              </div>

              <div className="space-y-8">
                <div className="relative group">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff005a] transition-colors" size={18} />
                  <select required className="input-style appearance-none" onChange={(e) => setFormData({...formData, school: e.target.value})}>
                    <option value="">SELECT YOUR ALMA MATER</option>
                    {schools.map(s => <option key={s} value={s} className="bg-black">{s.toUpperCase()}</option>)}
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff005a] transition-colors" size={18} />
                    <select className="input-style appearance-none" onChange={(e) => setFormData({...formData, batch: e.target.value})}>
                      <option value="SSC 24">SSC BATCH &apos;24</option>
                      <option value="HSC 26">HSC BATCH &apos;26</option>
                    </select>
                  </div>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff005a] transition-colors" size={18} />
                    <select className="input-style appearance-none" onChange={(e) => setFormData({...formData, board: e.target.value})}>
                      {boards.map(b => <option key={b} value={b} className="bg-black">{b.toUpperCase()} BOARD</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Node */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <span className="text-[#ff005a] font-black italic font-mono text-xl">03.</span>
                <h3 className="font-black uppercase tracking-[0.3em] text-xs text-gray-300">Authorization Details</h3>
              </div>

              <div className="bg-[#ff005a]/5 border border-[#ff005a]/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left space-y-2">
                  <h4 className="text-white font-black uppercase italic tracking-widest text-sm">Transfer Protocol</h4>
                  <p className="text-gray-500 font-mono text-[10px] leading-relaxed uppercase">
                    Receiver: <span className="text-[#ff005a] font-bold">01XXXXXXXXX</span> (PERSONAL)<br />
                    Amount: <span className="text-white">500.00 BDT</span> | Ref: <span className="text-white">B24</span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-black text-xs text-gray-500">BKASH</div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-black text-xs text-gray-500">NAGAD</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label-style">Sender Number</label>
                  <input required type="tel" placeholder="01XXXXXXXXX" className="input-style border-[#ff005a]/10"
                    onChange={(e) => setFormData({...formData, senderNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="label-style text-[#ff005a]">Transaction ID (TXN)</label>
                  <input required type="text" placeholder="AX20J0L..." className="input-style border-[#ff005a]/40 text-[#ff005a] font-black uppercase"
                    onChange={(e) => setFormData({...formData, trxId: e.target.value.toUpperCase()})} />
                </div>
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-mono">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button 
              type="submit" disabled={isSubmitting}
              className="group relative w-full overflow-hidden py-6 bg-white text-black rounded-3xl font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-[#ff005a] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-4">
                {isSubmitting ? "ENCRYPTING..." : "COMMIT_ENTRY"} <ArrowRight size={20} />
              </span>
            </button>
          </form>
        </motion.div>

        <footer className="mt-24 text-center space-y-6">
          <div className="flex justify-center gap-8 text-gray-600">
            <Globe size={18} className="hover:text-white transition-colors cursor-pointer" />
            <Hash size={18} className="hover:text-white transition-colors cursor-pointer" />
            <ShieldCheck size={18} className="hover:text-white transition-colors cursor-pointer" />
          </div>
          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.5em]">
            &copy; 2026 BackBencher&apos;s 24 Hub // Secured by B24 Protocols
          </p>
        </footer>
      </div>

      <style jsx>{`
        .label-style {
          display: block;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #555;
          margin-left: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .input-style {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 1.5rem;
          padding: 1.25rem 1.25rem 1.25rem 3.5rem;
          outline: none;
          color: white;
          font-size: 0.8rem;
          font-family: monospace;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .input-style:focus {
          border-color: #ff005a;
          background: rgba(255, 0, 90, 0.03);
          box-shadow: 0 0 40px rgba(255, 0, 90, 0.05);
        }
        select.input-style {
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
