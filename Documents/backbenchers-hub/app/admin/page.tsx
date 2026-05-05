"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPortal() {
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "registrations"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRegistrations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const approvePayment = async (id: string) => {
    const userDoc = doc(db, "registrations", id);
    await updateDoc(userDoc, { status: "approved" });
    alert("Ticket marked as approved! You can now send the email via Resend.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <h1 className="text-2xl font-black mb-8 text-indigo-900 uppercase">Payment Approval Desk</h1>
      
      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase text-gray-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">TrxID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{reg.name}</td>
                <td className="p-4 font-mono">{reg.phone}</td>
                <td className="p-4 font-bold text-indigo-600 uppercase">{reg.trxId}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${reg.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {reg.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {reg.status === 'pending' && (
                    <button onClick={() => approvePayment(reg.id)} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold">Approve</button>
                  )}
                  <button onClick={() => deleteDoc(doc(db, "registrations", reg.id))} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
