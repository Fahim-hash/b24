import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { jsPDF } from "jspdf";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * সার্ভার-সাইডে ইমেজ লোড করার জন্য হেল্পার ফাংশন।
 * এটি URL থেকে ইমেজ ডাউনলোড করে Buffer এ রূপান্তর করে।
 */
async function fetchImageAsBuffer(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not fetch image: ${url}`);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Image Fetch Error:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, school, board, batch, trxId, ticketId, status, reason } = body;

    // --- APPROVAL LOGIC ---
    if (status === 'approved') {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [600, 400]
      });

      // ১. ব্যাকগ্রাউন্ড (Pure Black)
      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, 600, 400, 'F');

      // ২. লোগো ও কিউআর কোড লোডিং
      // সার্ভার সাইডে ইমেজ অ্যাড করতে Buffer ব্যবহার করা বাধ্যতামূলক
      const relaxLogoBuffer = await fetchImageAsBuffer("https://syedfahimmuddasir.bro.bd/r24-logo.png");
      const b24LogoBuffer = await fetchImageAsBuffer("https://syedfahimmuddasir.bro.bd/b24-logo.png");
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}&color=ff005a&bgcolor=0a0a0a`;
      const qrBuffer = await fetchImageAsBuffer(qrUrl);

      if (relaxLogoBuffer) doc.addImage(relaxLogoBuffer, 'PNG', 30, 20, 35, 35);
      if (b24LogoBuffer) doc.addImage(b24LogoBuffer, 'PNG', 75, 20, 35, 35);
      if (qrBuffer) doc.addImage(qrBuffer, 'PNG', 440, 115, 115, 115);

      // ৩. আইকন ড্রয়িং (শেপ ব্যবহার করা হয়েছে যাতে ফন্ট এরর না আসে)
      doc.setDrawColor(255, 0, 90); 
      doc.setLineWidth(2.5);
      // Circle (○)
      doc.circle(480, 37, 10, 'S');
      // Triangle (△)
      doc.line(510, 47, 520, 27); doc.line(520, 27, 530, 47); doc.line(530, 47, 510, 47);
      // Square (□)
      doc.rect(550, 28, 18, 18, 'S');

      // ৪. টাইটেল এবং সেপারেটর
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("B24 PLAYER CARD", 30, 80);
      doc.setDrawColor(255, 0, 90);
      doc.setLineWidth(1.5);
      doc.line(30, 92, 570, 92);

      // ৫. প্লেয়ার ইনফরমেশন
      doc.setFontSize(14);
      const startY = 130;
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
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text(`#${ticketId}`, 495, 273, { align: "center" });

      // ৭. ফুটার
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(8);
      doc.text("GEN-ID: RELAX-STUDIO-ALPHA-6 // SECURED BY ODF MEDIA", 30, 385);

      const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

      // --- ইমেইল টেমপ্লেট ---
      const emailHtml = `
        <div style="background-color: #0a0a0a; color: #ffffff; font-family: sans-serif; padding: 40px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; border: 2px solid #ff005a; padding: 30px; border-radius: 20px;">
            <h1 style="color: #ff005a; font-size: 32px; letter-spacing: 5px;">○ △ □</h1>
            <h2 style="text-transform: uppercase;">Invitation Verified</h2>
            <p>Greetings Player <strong>${name}</strong>,</p>
            <p>Your dossier for the <strong>BackBencher's 24 Mega-Reunion</strong> is confirmed.</p>
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin: 30px 0;">
              <h3 style="margin: 0; font-size: 24px; color: #ff005a;">#${ticketId}</h3>
            </div>
            <p style="font-size: 14px; color: #888;">Attached is your digital ticket. Scan the QR at the entrance.</p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 40px 0;">
            <p style="font-size: 12px; color: #555;">RELAXSTUDIO & ODF CREATIVE DIRECTION</p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'B24 Reunion <tickets@backbenchers24.pro.bd>', 
        to: email,
        subject: `PLAYER DOSSIER: #${ticketId}`,
        html: emailHtml,
        attachments: [{ filename: `B24_Dossier_${ticketId}.pdf`, content: pdfBuffer }]
      });

      return NextResponse.json({ success: true });
    } 
    
    // --- REJECTION LOGIC ---
    else if (status === 'rejected') {
      const rejectHtml = `
        <div style="background-color: #0a0a0a; color: #ffffff; padding: 40px; text-align: center; font-family: sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; border: 2px solid #444; padding: 30px; border-radius: 20px;">
            <h2 style="color: #ff4d4d; text-transform: uppercase;">Verification Failed</h2>
            <p>Dear ${name}, your registration could not be verified.</p>
            <div style="background: #1a1a1a; padding: 15px; border-left: 4px solid #ff4d4d; text-align: left; margin: 20px 0;">
              <strong>Reason:</strong> ${reason}
            </div>
            <p style="font-size: 13px; color: #666;">Please contact support for further inquiry.</p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'B24 Support <info@backbenchers24.pro.bd>',
        to: email,
        subject: 'B24 Registration Update',
        html: rejectHtml
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
