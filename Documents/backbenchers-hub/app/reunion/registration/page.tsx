"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { User, Mail, Phone, School, Hash, ArrowRight, CheckCircle2 } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', batch: 'SSC 24',
    school: '', trxId: '', senderNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Submission failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
          <CheckCircle2 className="mx-auto text-[#ff005a]" size={64} />
          <h1 className="text-3xl font-black uppercase tracking-tighter">Request received!</h1>
          <p className="text-gray-400 font-mono text-sm max-w-md">
            Your verification protocol is in progress. Once confirmed, your ticket will be transmitted to <strong>{formData.email}</strong>.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020202] text-white py-20 px-6 font-sans">
      <div className="container max-w-2xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-10">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">
            PLAYER <span className="text-[#ff005a]">ENTRY</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Node: SSC &apos;24 REUNION</p>
        </motion.div>

        <motion.form 
          initial="hidden" animate="visible" variants={fadeInUp}
          onSubmit={handleSubmit}
          className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] space-y-5 shadow-2xl"
        >
          {/* User Info Section */}
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input required type="text" placeholder="FULL NAME" className="input-field"
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input required type="email" placeholder="EMAIL ADDRESS" className="input-field"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input required type="tel" placeholder="CONTACT NUMBER" className="input-field"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="relative">
              <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input required type="text" placeholder="SCHOOL NAME" className="input-field"
                onChange={(e) => setFormData({...formData, school: e.target.value})} />
            </div>
          </div>

          {/* Payment Section */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="bg-[#ff005a]/5 border border-[#ff005a]/20 p-4 rounded-xl text-[11px] font-mono leading-relaxed">
              <span className="text-[#ff005a] font-bold block mb-1">PAYMENT PROTOCOL:</span>
              1. Send <strong>500 BDT</strong> to 017XXXXXXXX (Bkash/Nagad/Rocket)<br />
              2. Use &quot;B24&quot; as reference.
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff005a]" size={16} />
                <input required type="tel" placeholder="SENDER NUMBER" className="input-field border-[#ff005a]/20"
                  onChange={(e) => setFormData({...formData, senderNumber: e.target.value})} />
              </div>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff005a]" size={16} />
                <input required type="text" placeholder="TRANSACTION ID" className="input-field border-[#ff005a]/20"
                  onChange={(e) => setFormData({...formData, trxId: e.target.value})} />
              </div>
            </div>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#ff005a] hover:text-white transition-all duration-500 disabled:opacity-50"
          >
            {isSubmitting ? "ENCRYPTING DATA..." : "CONFIRM REGISTRATION"} <ArrowRight size={18} />
          </button>
        </motion.form>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1rem 1rem 1rem 3rem;
          outline: none;
          transition: all 0.3s;
          font-size: 0.875rem;
        }
        .input-field:focus {
          border-color: #ff005a;
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </main>
  );
}
