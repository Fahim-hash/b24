import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { jsPDF } from "jspdf";

const resend = new Resend(process.env.RESEND_API_KEY);

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

      // --- PDF DESIGN ---
      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, 600, 400, 'F');

      doc.setDrawColor(255, 0, 90);
      doc.setLineWidth(5);
      doc.line(0, 0, 0, 400);

      doc.setTextColor(255, 0, 90);
      doc.setFontSize(40);
      doc.text("○ △ □", 440, 50);

      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("B24 PLAYER CARD", 30, 55);
      
      doc.setDrawColor(255, 0, 90);
      doc.setLineWidth(1);
      doc.line(30, 70, 570, 70);

      doc.setFontSize(14);
      const startY = 110;
      const col1 = 30;
      const rowGap = 30;

      const details = [
        { label: "PLAYER NAME", value: String(name || 'N/A').toUpperCase() },
        { label: "PHONE", value: String(phone || 'N/A') },
        { label: "INSTITUTION", value: String(school || 'WLFSC').toUpperCase() },
        { label: "BOARD/BATCH", value: `${board || 'DHAKA'} / ${batch || '2024'}` },
        { label: "TRANSACTION ID", value: String(trxId || 'N/A').toUpperCase() },
        { label: "TICKET STATUS", value: "VERIFIED & CONFIRMED" }
      ];

      details.forEach((item, index) => {
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(10);
        doc.text(item.label, col1, startY + (index * rowGap));
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text(item.value, col1, startY + (index * rowGap) + 15);
      });

      doc.setFillColor(255, 0, 90);
      doc.rect(400, 320, 180, 50, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text(`#${ticketId}`, 415, 352);

      doc.setTextColor(40, 40, 40);
      doc.setFontSize(8);
      doc.text("GEN-ID: RELAX-STUDIO-ALPHA-6 // SECURED BY ODF MEDIA", 30, 385);

      const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

      // --- EMAIL BODY ---
      const emailHtml = `
        <div style="background-color: #0a0a0a; color: #ffffff; font-family: sans-serif; padding: 40px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; border: 2px solid #ff005a; padding: 30px; border-radius: 20px;">
            <h1 style="color: #ff005a; font-size: 32px; letter-spacing: 5px; margin-bottom: 10px;">○ △ □</h1>
            <h2 style="text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Invitation Verified</h2>
            <p style="font-size: 18px; color: #cccccc;">Greetings Player <strong>${name}</strong>,</p>
            <p>Your payment for <strong>BackBencher's 24 Mega-Reunion</strong> is confirmed.</p>
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin: 30px 0;">
              <p style="margin: 0; color: #ff005a; font-size: 14px;">Unique Ticket ID</p>
              <h3 style="margin: 5px 0; font-size: 24px;">#${ticketId}</h3>
            </div>
            <p style="font-size: 14px; color: #888;">Attached is your digital dossier. Keep it safe.</p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 40px 0;">
            <p style="font-size: 12px; color: #555;">RELAXSTUDIO & ODF CREATIVE DIRECTION</p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'B24 Reunion <tickets@backbenchers24.pro.bd>', // ডোমেইন আপডেট করা হয়েছে
        to: email,
        subject: `PLAYER CONFIRMED: #${ticketId}`,
        html: emailHtml,
        attachments: [{ filename: `B24_Dossier_${ticketId}.pdf`, content: pdfBuffer }]
      });

      return NextResponse.json({ success: true });
    } 
    
    else if (status === 'rejected') {
      const rejectHtml = `
        <div style="background-color: #0a0a0a; color: #ffffff; font-family: sans-serif; padding: 40px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; border: 2px solid #555; padding: 30px; border-radius: 20px;">
            <h2 style="color: #ff4d4d; text-transform: uppercase;">Registration Terminated</h2>
            <p style="color: #ccc;">Dear ${name}, we could not verify your credentials for the B24 Reunion.</p>
            <div style="background: #1a1a1a; padding: 20px; border-left: 4px solid #ff4d4d; text-align: left; margin: 20px 0;">
              <strong>Reason:</strong> ${reason}
            </div>
            <p style="font-size: 14px; color: #888;">Contact support if you think this is an error.</p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'B24 Support <info@backbenchers24.pro.bd>', // ডোমেইন আপডেট করা হয়েছে
        to: email,
        subject: 'B24 Registration Status Update',
        html: rejectHtml
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  } catch (error: any) {
    console.error("Critical API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
