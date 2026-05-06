"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

export default function AdminPortal() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');

  const ADMIN_PASS = "Fahim@2026"; //

  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(collection(db, "registrations"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRegistrations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // পেমেন্ট অ্যাপ্রুভ এবং ইমেইল সেন্ডিং
  const handleApprove = async (reg: any) => {
    const ticketId = `B24-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    try {
      // ১. ডাটাবেজ আপডেট
      await updateDoc(doc(db, "registrations", reg.id), { 
        status: "approved", 
        ticketId: ticketId 
      });

      // ২. ইমেইল পাঠানোর API কল
      const response = await fetch('/api/send-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: reg.email, 
          name: reg.name, 
          phone: reg.phone,
          school: reg.school || 'WLFSC', //
          board: reg.board || 'Dhaka',
          batch: reg.batch || '2024', //
          trxId: reg.trxId,
          ticketId: ticketId, 
          status: 'approved' 
        }),
      });

      if (response.ok) {
        alert(`Approved! Ticket ID: ${ticketId} and Email Sent.`);
      } else {
        alert("Approved in DB, but Email API failed.");
      }
    } catch (err) {
      alert("Approval failed. Check console.");
      console.error(err);
    }
  };

  // পেমেন্ট রিজেক্ট এবং নোটিফিকেশন সেন্ডিং
  const handleReject = async (reg: any) => {
    const reason = prompt("Reject করার কারণ লিখুন (যেমন: Invalid TrxID):");
    if (!reason) return;

    try {
      await updateDoc(doc(db, "registrations", reg.id), { 
        status: "rejected", 
        rejectReason: reason 
      });
      
      await fetch('/api/send-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: reg.email, 
          name: reg.name, 
          reason: reason, 
          status: 'rejected' 
        }),
      });
      alert("Rejected email sent.");
    } catch (err) {
      console.error(err);
      alert("Rejection failed.");
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(registrations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, "BackBenchers_Registrations.xlsx");
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white font-mono">
        <div className="space-y-4 text-center">
          <h2 className="text-xl tracking-tighter uppercase">Admin Access Required</h2>
          <input type="password" placeholder="Enter Access Key" className="bg-transparent border-b border-white/20 p-2 outline-none text-center"
            onChange={(e) => setPass(e.target.value)} />
          <button onClick={() => pass === ADMIN_PASS && setIsAuthenticated(true)} className="block mx-auto text-pink-500 text-xs mt-4">COMMENCE</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 font-sans max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black italic">B24 CONTROL CENTER</h1>
        <button onClick={exportToExcel} className="bg-green-600 text-white px-6 py-2 rounded-full font-bold text-sm">Download Excel</button>
      </div>

      <div className="grid gap-4">
        {registrations.map((reg) => (
          <div key={reg.id} className={`p-6 rounded-3xl border flex flex-col md:flex-row justify-between items-center gap-4 ${reg.status === 'approved' ? 'bg-green-50' : 'bg-white shadow-sm'}`}>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{reg.name} <span className="text-xs font-normal text-gray-400">({reg.batch})</span></h3>
              <p className="text-xs text-gray-500 font-mono">{reg.email} | {reg.phone}</p>
              <p className="mt-2 font-black text-pink-600 uppercase tracking-widest">TrxID: {reg.trxId}</p>
            </div>
            
            <div className="flex gap-2">
              {reg.status === 'pending' && (
                <>
                  <button onClick={() => handleApprove(reg)} className="bg-black text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-pink-600 transition-colors">APPROVE</button>
                  <button onClick={() => handleReject(reg)} className="bg-red-100 text-red-600 px-6 py-2 rounded-xl text-xs font-bold">REJECT</button>
                </>
              )}
              {reg.status === 'approved' && <span className="text-green-600 font-black text-xs px-4 py-2 bg-green-100 rounded-lg">TICKET: {reg.ticketId}</span>}
              {reg.status === 'rejected' && <span className="text-red-600 font-bold text-xs">REJECTED</span>}
              <button onClick={() => deleteDoc(doc(db, "registrations", reg.id))} className="text-gray-300 hover:text-red-500 px-2 ml-2">X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
