"use client";

import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  User, Mail, Phone, School, 
  GraduationCap, MapPin, 
  ArrowRight, ChevronsUpDown 
} from 'lucide-react';

// --- CONFIG & DATA ---
const BOARDS = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Dinajpur", "Cumilla", "Mymensingh", "Madrasah", "Technical"];
const BATCHES = ["SSC 23", "SSC 24", "SSC 25"];

const COMMON_SCHOOLS = [
  "Willes Little Flower School & College",
  "Viqarunnisa Noon School & College",
  "Residential Model College",
  "Dhaka College",
  "Ideal School and College",
  "Motijheel Government Boys' High School",
  "Saint Joseph Higher Secondary School"
];

// --- FIXED VARIANTS (TypeScript Error Resolution) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] // Now properly typed as Variants
    } 
  }
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: 'SSC 24', 
    board: 'Dhaka',
    school: '',
    paymentMethod: 'bkash'
  });

  const [schoolSearch, setSchoolSearch] = useState("");
  const [showSchoolDrop, setShowSchoolDrop] = useState(false);

  const filteredSchools = useMemo(() => {
    if (schoolSearch.length < 3) return [];
    return COMMON_SCHOOLS.filter(s => 
      s.toLowerCase().includes(schoolSearch.toLowerCase())
    );
  }, [schoolSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration Initiated:", formData);
    alert("Protocol Initiated: Redirecting to Secured Payment Gateway...");
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white py-24 px-6 relative overflow-hidden font-sans">
      {/* Dynamic Background FX */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ff005a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container max-w-2xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">
            PLAYER <span className="text-[#ff005a]">REGISTRATION</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase">
            Protocol SSC &apos;24: Node Entry Required
          </p>
        </motion.div>

        <motion.form 
          initial="hidden" animate="visible" variants={fadeInUp}
          onSubmit={handleSubmit}
          className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] space-y-6 shadow-2xl"
        >
          {/* Full Name */}
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
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Ticket Delivery Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required type="email" placeholder="fahim@backbenchers.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#ff005a] outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Phone */}
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
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 appearance-none focus:border-[#ff005a] outline-none text-white"
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                >
                  {BATCHES.map(b => <option key={b} value={b} className="bg-[#111]">{b}</option>)}
                </select>
                <ChevronsUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Board Dropdown */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Education Board</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 appearance-none focus:border-[#ff005a] outline-none text-white"
                  onChange={(e) => setFormData({...formData, board: e.target.value})}
                >
                  {BOARDS.map(board => <option key={board} value={board} className="bg-[#111]">{board}</option>)}
                </select>
                <ChevronsUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* School Name Autocomplete */}
          <div className="space-y-2 relative">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">School Name</label>
            <div className="relative">
              <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required type="text" 
                value={schoolSearch}
                placeholder="Type 4+ letters to find school..."
                onFocus={() => setShowSchoolDrop(true)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#ff005a] outline-none transition-all"
                onChange={(e) => {
                  setSchoolSearch(e.target.value);
                  setFormData({...formData, school: e.target.value});
                }}
              />
            </div>
            
            {showSchoolDrop && schoolSearch.length >= 3 && (
              <div className="absolute z-50 w-full mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)]">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((s, i) => (
                    <div 
                      key={i} 
                      className="px-6 py-4 hover:bg-[#ff005a]/20 cursor-pointer text-sm border-b border-white/5 last:border-none transition-colors"
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
                  <div className="px-6 py-4 text-xs text-gray-500 italic flex items-center justify-between">
                    <span>Not in list? Your input will be saved.</span>
                    <span className="text-[#ff005a] uppercase font-bold text-[8px] border border-[#ff005a]/30 px-2 py-1 rounded">New School Node</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="pt-8 border-t border-white/5">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-center text-gray-600 mb-6 font-mono">Authorization Channel</h4>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'bkash'})}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest ${formData.paymentMethod === 'bkash' ? 'bg-[#ff005a]/10 border-[#ff005a] text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
              >
                <div className={`w-2 h-2 rounded-full ${formData.paymentMethod === 'bkash' ? 'bg-[#ff005a]' : 'bg-gray-700'}`} /> bKash
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'nagad'})}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest ${formData.paymentMethod === 'nagad' ? 'bg-[#ff005a]/10 border-[#ff005a] text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
              >
                <div className={`w-2 h-2 rounded-full ${formData.paymentMethod === 'nagad' ? 'bg-[#ff005a]' : 'bg-gray-700'}`} /> Nagad
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#ff005a] hover:text-white transition-all duration-500 mt-10 group text-sm"
          >
            CONFIRM ENTRY <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        </motion.form>

        {/* Footer info */}
        <p className="mt-8 text-center text-gray-600 font-mono text-[9px] uppercase tracking-widest">
          All data is encrypted via backbencher network protocols
        </p>
      </div>
    </main>
  );
}
