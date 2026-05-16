"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// স্কুল অবজেক্টের টাইপ ডেফিনিশন
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
  const [allSchools, setAllSchools] = useState<School[]>([]); // JSON ডেটা স্টোর করার স্টেট

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    batch: 'SSC 24', // Default selected
    board: 'Dhaka',
    school: '',
    trxId: ''
  });

  // public/data/schools.json থেকে ডেটা ফেচ করার ইফেক্ট
  useEffect(() => {
    fetch('/data/schools.json')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load schools data");
        return res.json();
      })
      .then((data: School[]) => setAllSchools(data))
      .catch((err) => console.error("Error loading schools JSON:", err));
  }, []);

  // বোর্ড অনুযায়ী এবং সার্চ টার্ম অনুযায়ী অপ্টিমাইজড ফিল্টারিং
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
        school: searchTerm, // বর্তমান সার্চ টার্মই স্কুল হিসেবে সেভ হবে
        status: "pending", // পেমেন্ট অ্যাপ্রুভালের জন্য ডিফল্ট স্ট্যাটাস
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error) {
      alert("Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full border-t-4 border-green-500">
          <h1 className="text-2xl font-bold text-gray-800">অপেক্ষায় থাকুন!</h1>
          <p className="text-gray-600 mt-2">আপনার তথ্য জমা হয়েছে। পেমেন্ট ভেরিফাই হলে {formData.email} ঠিকানায় টিকিট চলে যাবে।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-700 p-10 text-white">
          <h1 className="text-3xl font-black tracking-tight">REGISTRATION PORTAL</h1>
          <p className="text-indigo-100 opacity-80 uppercase text-xs tracking-widest mt-2 font-semibold">SSC &apos;24 REUNION HUB</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Full Name</label>
              <input required type="text" className="input-box" placeholder="আপনার নাম" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Phone</label>
              <input required type="tel" className="input-box" placeholder="01XXXXXXXXX" 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email (For Ticket Delivery)</label>
            <input required type="email" className="input-box" placeholder="example@mail.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">SSC Batch</label>
              <select className="input-box" value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})}>
                {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Board</label>
              <select className="input-box" value={formData.board} onChange={(e) => {
                setFormData({...formData, board: e.target.value});
                setSearchTerm(''); // বোর্ড চেঞ্জ করলে সার্চ টার্ম রিসেট হবে ক্লিয়ার এক্সপেরিয়েন্সের জন্য
              }}>
                {BOARDS.map(board => <option key={board} value={board}>{board}</option>)}
              </select>
            </div>
          </div>

          {/* School Suggestion System */}
          <div className="relative">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">School Name</label>
            <input required type="text" value={searchTerm} className="input-box" placeholder="স্কুলের নাম লিখুন..." 
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // ম্যাপে ক্লিক করার সময় দেয়ার জন্য সামান্য ডিলে
              onChange={(e) => setSearchTerm(e.target.value)} />
            
            {showSuggestions && filteredSchools.length > 0 && (
              <div className="absolute z-50 w-full bg-white border border-gray-200 mt-1 rounded-xl shadow-2xl max-h-48 overflow-y-auto(সক্রোল)">
                {filteredSchools.map((s, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-sm border-b border-gray-50"
                    onClick={() => { setSearchTerm(s.school_name); setShowSuggestions(false); }}>
                    {s.school_name}
                  </div>
                ))}
              </div>
            )}
            {searchTerm.length >= 3 && filteredSchools.length === 0 && (
              <p className="text-[10px] text-orange-500 mt-1">Note: School not found in {formData.board} board? Continue typing to add manually.</p>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="bg-indigo-50 p-6 rounded-2xl mb-8 border border-indigo-100">
              <h4 className="text-indigo-900 font-bold text-sm mb-2 uppercase">Payment Details:</h4>
              <p className="text-indigo-700 text-xs leading-relaxed font-medium">
                Send <span className="font-bold text-indigo-900 underline">500 BDT</span> to <span className="font-bold text-indigo-900">01XXXXXXXXX</span> (Bkash/Nagad Personal). <br />
                Reference এ আপনার নাম লিখবেন।
              </p>
            </div>
            <label className="block text-xs font-bold uppercase text-indigo-600 mb-2">Transaction ID (TrxID)</label>
            <input required type="text" className="input-box border-indigo-200 focus:border-indigo-600 font-mono uppercase" 
              placeholder="e.g. AX5K2LP9" onChange={(e) => setFormData({...formData, trxId: e.target.value})} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-95 disabled:bg-gray-400 uppercase tracking-widest text-sm">
            {loading ? "Logging Protocol..." : "Confirm Registration"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .input-box {
          width: 100%;
          padding: 0.85rem 1.25rem;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          outline: none;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .input-box:focus {
          border-color: #4f46e5;
          ring: 2px solid #4f46e5;
        }
      `}</style>
    </div>
  );
}
