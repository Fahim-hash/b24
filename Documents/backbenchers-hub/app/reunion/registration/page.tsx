"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, School, 
  GraduationCap, MapPin, CreditCard, 
  ArrowRight, Check, ChevronsUpDown 
} from 'lucide-react';

const BOARDS = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Dinajpur", "Cumilla", "Mymensingh", "Madrasah", "Technical"];
const BATCHES = ["SSC 23", "SSC 24", "SSC 25"];

// Sample common schools list (You can expand this or fetch from an API)
const COMMON_SCHOOLS = [
  "Willes Little Flower School & College",
  "Viqarunnisa Noon School & College",
  "Residential Model College",
  "Dhaka College",
  "Ideal School and College",
  "Motijheel Government Boys' High School",
  "Saint Joseph Higher Secondary School"
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: 'SSC 24', // Default Auto-select
    board: 'Dhaka',
    school: '',
    paymentMethod: 'bkash'
  });

  const [schoolSearch, setSchoolSearch] = useState("");
  const [showSchoolDrop, setShowSchoolDrop] = useState(false);

  // School filtering logic
  const filteredSchools = useMemo(() => {
    if (schoolSearch.length < 3) return [];
    return COMMON_SCHOOLS.filter(s => 
      s.toLowerCase().includes(schoolSearch.toLowerCase())
    );
  }, [schoolSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    alert("Protocol Initiated: Redirecting to Payment Gateway...");
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white py-24 px-6 relative overflow-hidden font-sans">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ff005a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container max-w-2xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">
            PLAYER <span className="text-[#ff005a]">REGISTRATION</span>
          </h1>
          <p className="text-gray-500 font-mono text-xs tracking-[0.3em] uppercase">
            Fill the segments to secure your node
          </p>
        </motion.div>

        <motion.form 
          initial="hidden" animate="visible" variants={fadeInUp}
          onSubmit={handleSubmit}
          className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] space-y-6 shadow-2xl"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#ff005a] font-bold ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required type="text" placeholder="SYED FAHIM MUDDASIR"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#ff005a] outline-none transition-all font-medium"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Email (For Ticket Delivery)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required type="email" placeholder="fahim@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#ff005a] outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required type="tel" placeholder="017XXXXXXXX"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#ff005a] outline-none transition-all"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Batch Dropdown */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">SSC Batch</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <select 
                  value={formData.batch}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 appearance-none focus:border-[#ff005a] outline-none"
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                >
                  {BATCHES.map(b => <option key={b} value={b} className="bg-[#111]">{b}</option>)}
                </select>
                <ChevronsUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            {/* Board Dropdown */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Education Board</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 appearance-none focus:border-[#ff005a] outline-none"
                  onChange={(e) => setFormData({...formData, board: e.target.value})}
                >
                  {BOARDS.map(board => <option key={board} value={board} className="bg-[#111]">{board}</option>)}
                </select>
                <ChevronsUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>
          </div>

          {/* School Name with Recommendation Logic */}
          <div className="space-y-2 relative">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">School Name</label>
            <div className="relative">
              <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required type="text" 
                value={schoolSearch}
                placeholder="Start typing school name..."
                onFocus={() => setShowSchoolDrop(true)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#ff005a] outline-none transition-all"
                onChange={(e) => {
                  setSchoolSearch(e.target.value);
                  setFormData({...formData, school: e.target.value});
                }}
              />
            </div>
            
            {/* Recommendation Dropdown */}
            {showSchoolDrop && schoolSearch.length >= 3 && (
              <div className="absolute z-50 w-full mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((s, i) => (
                    <div 
                      key={i} 
                      className="px-6 py-3 hover:bg-[#ff005a]/20 cursor-pointer text-sm border-b border-white/5 last:border-none"
                      onClick={() => {
                        setSchoolSearch(s);
                        setFormData({...formData, school: s});
                        setShowSchoolDrop(false);
                      }}
                    >
                      {s}
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-3 text-sm text-gray-500 italic">
                    No exact match. Your input will be added as a new school.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Payment Gateway Preview */}
          <div className="pt-8 border-t border-white/5 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-center text-gray-500 mb-6">Secured Payment Method</h4>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'bkash'})}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 ${formData.paymentMethod === 'bkash' ? 'bg-[#ff005a]/10 border-[#ff005a] text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
              >
                <div className="w-2 h-2 rounded-full bg-[#e2136e]" /> bKash
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'nagad'})}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 ${formData.paymentMethod === 'nagad' ? 'bg-[#ff005a]/10 border-[#ff005a] text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
              >
                <div className="w-2 h-2 rounded-full bg-[#f6921e]" /> Nagad
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#ff005a] hover:text-white transition-all duration-500 mt-10 group"
          >
            CONFIRM REGISTRATION <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.form>
      </div>
    </main>
  );
}
