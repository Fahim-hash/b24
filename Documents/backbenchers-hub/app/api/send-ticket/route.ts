import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { jsPDF } from "jspdf";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * ইমেজ ফেচ করে Base64 এ কনভার্ট করার ফাংশন
 */
async function fetchImageAsBase64(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error("Image Fetch Error:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, school, board, batch, trxId, ticketId, status, reason } = body;

    if (status === 'approved') {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [600, 400]
      });

      // ১. ব্যাকগ্রাউন্ড (Pure Black)
      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, 600, 400, 'F');

      // ২. লোগো ও হাই-রেজ কিউআর কোড
      const relaxLogoBase64 = await fetchImageAsBase64("https://syedfahimmuddasir.bro.bd/r24-logo.png");
      const b24LogoBase64 = await fetchImageAsBase64("https://syedfahimmuddasir.bro.bd/b24-logo.png");
      
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${ticketId}&color=ff005a&bgcolor=0a0a0a`;
      const qrBase64 = await fetchImageAsBase64(qrUrl);

      // লোগোর সাইজ ফিক্স (Aspect Ratio ঠিক রাখা হয়েছে)
      // চওড়া (Width) বাড়ানো হয়েছে এবং উচ্চতা (Height) কমানো হয়েছে যাতে চ্যাপ্টা না লাগে
      if (relaxLogoBase64) doc.addImage(relaxLogoBase64, 'PNG', 30, 25, 75, 30, undefined, 'FAST');
      if (b24LogoBase64) doc.addImage(b24LogoBase64, 'PNG', 115, 25, 75, 30, undefined, 'FAST');
      
      // QR Code পজিশন
      if (qrBase64) doc.addImage(qrBase64, 'PNG', 430, 105, 130, 130, undefined, 'MEDIUM');

      // ৩. স্কুইড গেম আইকন (○ △ □)
      doc.setDrawColor(255, 0, 90); 
      doc.setLineWidth(2.5);
      doc.circle(480, 37, 10, 'S'); 
      doc.line(510, 47, 520, 27); doc.line(520, 27, 530, 47); doc.line(530, 47, 510, 47); 
      doc.rect(550, 28, 18, 18, 'S'); 

      // ৪. টাইটেল
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("B24 PLAYER CARD", 30, 85);
      doc.setDrawColor(255, 0, 90);
      doc.setLineWidth(1.5);
      doc.line(30, 95, 570, 95);

      // ৫. ডাটা সেকশন
      doc.setFontSize(14);
      const startY = 135;
      const details = [
        { label: "PLAYER NAME", value: String(name || 'N/A').toUpperCase() },
        { label: "PHONE", value: String(phone || 'N/A') },
        { label: "INSTITUTION", value: String(school || 'WLFSC').toUpperCase() },
        { label: "BOARD / BATCH", value: `${board || 'DHAKA'} / ${batch || '2024'}` },
        { label: "TRANSACTION ID", value: String(trxId || 'N/A').toUpperCase() },
        { label: "STATUS", value: "VERIFIED & CONFIRMED" }
      ];

      details.forEach((item, index) => {
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(9);
        doc.text(item.label, 30, startY + (index * 32));
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.text(item.value, 30, startY + (index * 32) + 12);
      });

      // ৬. টিকেট আইডি বক্স
      doc.setFillColor(255, 0, 90);
      doc.rect(410, 245, 170, 45, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`#${ticketId}`, 495, 273, { align: "center" });

      // ৭. ফুটার
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(8);
      doc.text("GEN-ID: RELAX-STUDIO-ALPHA-6 // SECURED BY ODF MEDIA // B24 REUNION", 30, 385);

      const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

      // --- ইমেইল ---
      await resend.emails.send({
        from: 'B24 Reunion <tickets@backbenchers24.pro.bd>', 
        to: email,
        subject: `PLAYER DOSSIER: #${ticketId}`,
        html: `<div style="background:#0a0a0a; color:#fff; padding:40px; text-align:center; font-family:sans-serif;">
                <h1 style="color:#ff005a; letter-spacing:5px;">○ △ □</h1>
                <h2>IDENTITY VERIFIED</h2>
                <p>Welcome Player <strong>${name}</strong>. Your dossier is attached.</p>
               </div>`,
        attachments: [{ filename: `B24_Dossier_${ticketId}.pdf`, content: pdfBuffer }]
      });

      return NextResponse.json({ success: true });
    } 
    
    // Rejection logic
    else if (status === 'rejected') {
      await resend.emails.send({
        from: 'B24 Support <info@backbenchers24.pro.bd>',
        to: email,
        subject: 'B24 Registration Update',
        html: `<div style="background:#000; color:#fff; padding:30px; text-align:center;"><h2>Verification Failed</h2><p>${reason}</p></div>`
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
