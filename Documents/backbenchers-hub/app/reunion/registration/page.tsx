"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface School {
  school_name: string;
  board: string;
}

const BOARDS = ["Dhaka", "Chittagong", "Rajshahi", "Comilla", "Barisal", "Sylhet", "Dinajpur", "Jessore", "Mymensingh", "Madrasah", "Technical"];
const BATCHES = ["SSC 23", "SSC 24", "SSC 25"];

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allSchools, setAllSchools] = useState<School[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    batch: 'SSC 24',
    board: 'Dhaka',
    school: '',
    trxId: ''
  });

  useEffect(() => {
    fetch('/data/schools.json')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load schools data");
        return res.json();
      })
      .then((data: School[]) => setAllSchools(data))
      .catch((err) => console.error("Error loading schools JSON:", err));
  }, []);

  const filteredSchools = useMemo(() => {
    if (searchTerm.length < 3) return [];
    return allSchools.filter(s => 
      s.board && s.board.toLowerCase() === formData.board.toLowerCase() &&
      s.school_name && s.school_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, formData.board, allSchools]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        school: searchTerm,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error) {
      alert("Elimination Avoided! Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0c10] p-6 font-mono text-white">
        <div className="bg-[#141824] p-8 rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.3)] text-center max-w-sm w-full border-t-4 border-[#e11d48]">
          <div className="text-[#e11d48] text-4xl mb-4 font-bold">○ △ □</div>
          <h1 className="text-2xl font-black tracking-widest uppercase text-[#e11d48]">PLAYER VALIDIATED</h1>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            আপনার ডাটা সার্ভারে লক করা হয়েছে। পেমেন্ট ভেরিফাই হলে <span className="text-[#03dac6] font-bold">{formData.email}</span> এ আপনার অফিসিয়াল এন্ট্রি টিকিট পাঠানো হবে। 
          </p>
          <div className="mt-6 text-[11px] text-gray-500 tracking-wider">DO NOT BACK OUT NOW.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b10] bg-radial py-12 px-4 font-mono text-gray-200 selection:bg-[#e11d48] selection:text-white">
      <div className="max-w-2xl mx-auto bg-[#111420] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden border border-gray-800 relative">
        
        {/* Squid Game Mask Elements Top Right */}
        <div className="absolute top-4 right-6 text-gray-700 tracking-widest text-lg font-black select-none pointer-events-none opacity-40">
          ○ △ □
        </div>

        {/* Header Header */}
        <div className="bg-[#161a2b] p-10 text-center border-b border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e11d48]/5 to-transparent animate-pulse" />
          <h1 className="text-3xl font-black tracking-widest text-white uppercase">
            PLAYER <span className="text-[#e11d48]">REGISTRATION</span>
          </h1>
          <p className="text-[#03dac6] text-xs tracking-widest mt-2 font-bold uppercase">
            — BACKBENCHER &apos;24 REUNION PROTOCOL —
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
          
          {/* Inputs Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#e11d48] tracking-widest mb-2">● Full Name</label>
              <input required type="text" className="squid-input" placeholder="Enter Full Name" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#e11d48] tracking-widest mb-2">● Phone Number</label>
              <input required type="tel" className="squid-input" placeholder="01XXXXXXXXX" 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#e11d48] tracking-widest mb-2">● Email (Ticket Delivery)</label>
            <input required type="email" className="squid-input" placeholder="player@reunion.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#e11d48] tracking-widest mb-2">● Selected Batch</label>
              <select className="squid-input cursor-pointer" value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})}>
                {BATCHES.map(b => <option className="bg-[#111420]" key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#e11d48] tracking-widest mb-2">● Education Board</label>
              <select className="squid-input cursor-pointer" value={formData.board} onChange={(e) => {
                setFormData({...formData, board: e.target.value});
                setSearchTerm('');
              }}>
                {BOARDS.map(board => <option className="bg-[#111420]" key={board} value={board}>{board}</option>)}
              </select>
            </div>
          </div>

          {/* School Suggestion System */}
          <div className="relative">
            <label className="block text-xs font-bold uppercase text-[#e11d48] tracking-widest mb-2">● Institution / School</label>
            <input required type="text" value={searchTerm} className="squid-input" placeholder="Type school name..." 
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onChange={(e) => setSearchTerm(e.target.value)} />
            
            {showSuggestions && filteredSchools.length > 0 && (
              <div className="absolute z-50 w-full bg-[#161a2b] border border-gray-800 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto custom-scrollbar">
                {filteredSchools.map((s, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-[#e11d48]/10 hover:text-[#e11d48] cursor-pointer text-sm border-b border-gray-800/40 transition-colors"
                    onClick={() => { setSearchTerm(s.school_name); setShowSuggestions(false); }}>
                    {s.school_name}
                  </div>
                ))}
              </div>
            )}
            {searchTerm.length >= 3 && filteredSchools.length === 0 && (
              <p className="text-[10px] text-amber-500 tracking-wider mt-2">⚠️ NOT FOUND IN LIST? CONTINUE TYPING MANUALLY TO FORCE LOG.</p>
            )}
          </div>

          {/* Payment Arena */}
          <div className="pt-6 border-t border-gray-800/60">
            <div className="bg-[#161a2b] p-6 rounded-2xl mb-8 border-l-4 border-[#e11d48] relative overflow-hidden">
              <h4 className="text-[#e11d48] font-black text-xs mb-3 tracking-widest uppercase">FUND TRANSFER INSTRUCTIONS:</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-mono">
                Send <span className="font-bold text-white underline">500 BDT</span> to <span className="font-bold text-[#03dac6]">01XXXXXXXXX</span> (Bkash/Nagad Personal). <br />
                <span className="text-[11px] text-gray-500">🚨 Reference বক্সে অবশ্যই আপনার নাম ইনপুট করবেন।</span>
              </p>
            </div>
            <label className="block text-xs font-bold uppercase text-[#03dac6] tracking-widest mb-2">● Transaction ID (TrxID)</label>
            <input required type="text" className="squid-input border-[#03dac6]/30 focus:border-[#03dac6] font-mono tracking-widest uppercase" 
              placeholder="e.g. TRK9X2P1" onChange={(e) => setFormData({...formData, trxId: e.target.value})} />
          </div>

          {/* Submit Action */}
          <button type="submit" disabled={loading}
            className="w-full bg-[#e11d48] hover:bg-[#b91237] text-white font-black py-5 rounded-2xl shadow-[0_4px_20px_rgba(225,29,72,0.4)] transition-all active:scale-[0.98] disabled:bg-gray-800 disabled:text-gray-600 uppercase tracking-widest text-sm border border-[#ff416c]/20">
            {loading ? "PROFILING PLAYER..." : "ELIMINATE EMPTY SLOTS (REGISTER)"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .squid-input {
          width: 100%;
          padding: 0.95rem 1.35rem;
          background-color: #161a2b;
          border: 1px solid #242b45;
          color: #f3f4f6;
          border-radius: 1rem;
          outline: none;
          font-size: 0.9rem;
          transition: all 0.25s ease-in-out;
        }
        .squid-input:focus {
          border-color: #e11d48;
          background-color: #1a1f33;
          box-shadow: 0 0 10px rgba(225,29,72,0.15);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111420;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #242b45;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e11d48;
        }
      `}</style>
    </div>
  );
}
