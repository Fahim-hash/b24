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

      // ১. ব্যাকগ্রাউন্ড (Deep Black)
      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, 600, 400, 'F');

      // ২. লোগো ও হাই-রেজ কিউআর কোড
      const relaxLogoBase64 = await fetchImageAsBase64("https://syedfahimmuddasir.bro.bd/r24-logo.png");
      const b24LogoBase64 = await fetchImageAsBase64("https://syedfahimmuddasir.bro.bd/b24-logo.png");
      
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${ticketId}&color=ff005a&bgcolor=0a0a0a`;
      const qrBase64 = await fetchImageAsBase64(qrUrl);

      // লোগোর সাইজ ফিক্স (Aspect Ratio ঠিক রাখা হয়েছে)
      // দুইটা লোগো মিলে মোট ১৬০px গ্যাপসহ সেট করা হয়েছে
      if (relaxLogoBase64) doc.addImage(relaxLogoBase64, 'PNG', 30, 25, 75, 30, undefined, 'FAST');
      if (b24LogoBase64) doc.addImage(b24LogoBase64, 'PNG', 110, 25, 75, 30, undefined, 'FAST');
      
      if (qrBase64) doc.addImage(qrBase64, 'PNG', 430, 105, 130, 130, undefined, 'MEDIUM');

      // ৩. ভেক্টর আইকন (○ △ □)
      doc.setDrawColor(255, 0, 90); 
      doc.setLineWidth(2.5);
      doc.circle(480, 37, 10, 'S'); 
      doc.line(510, 47, 520, 27); doc.line(520, 27, 530, 47); doc.line(530, 47, 510, 47); 
      doc.rect(550, 28, 18, 18, 'S'); 

      // ৪. ডিভাইডার (টাইটেল বাদ দেওয়া হয়েছে আপনার রিকোয়েস্ট অনুযায়ী)
      doc.setDrawColor(255, 0, 90);
      doc.setLineWidth(1.5);
      doc.line(30, 85, 570, 85);

      // ৫. ডাটা সেকশন
      doc.setFontSize(14);
      const startY = 125;
      const details = [
        { label: "PARTICIPANT NAME", value: String(name || 'N/A').toUpperCase() },
        { label: "CONTACT NO", value: String(phone || 'N/A') },
        { label: "INSTITUTION", value: String(school || 'WLFSC').toUpperCase() },
        { label: "BOARD / BATCH", value: `${board || 'DHAKA'} / ${batch || '2024'}` },
        { label: "TRANSACTION ID", value: String(trxId || 'N/A').toUpperCase() },
        { label: "VERIFICATION STATUS", value: "CONFIRMED" }
      ];

      details.forEach((item, index) => {
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(9);
        doc.text(item.label, 30, startY + (index * 35));
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.text(item.value, 30, startY + (index * 35) + 12);
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

      // --- প্রিমিয়াম ইমেইল টেমপ্লেট ---
      const emailHtml = `
        <div style="background-color: #050505; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #222; padding: 40px; border-radius: 12px; background: #0a0a0a;">
            <div style="margin-bottom: 30px;">
                <span style="color: #ff005a; font-size: 24px; letter-spacing: 8px;">○ △ □</span>
            </div>
            
            <h1 style="color: #ffffff; font-size: 22px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;">Access Granted</h1>
            <div style="height: 1px; width: 50px; background: #ff005a; margin: 0 auto 30px auto;"></div>
            
            <p style="font-size: 16px; color: #aaa; line-height: 1.6; margin-bottom: 25px;">
              Greetings, <strong>${name}</strong>. <br>
              Your credentials for the <strong>BackBencher's 24 Mega-Reunion</strong> have been successfully verified. 
            </p>

            <div style="border: 1px dashed #333; padding: 20px; margin: 20px 0; border-radius: 8px;">
               <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Entry ID</p>
               <h2 style="margin: 5px 0; font-size: 28px; color: #ff005a; font-family: monospace;">#${ticketId}</h2>
            </div>

            <p style="font-size: 14px; color: #888; margin-top: 30px;">
              Your digital dossier is attached to this email. Please ensure you have it ready for scanning at the checkpoint.
            </p>

            <div style="margin-top: 40px; border-top: 1px solid #222; padding-top: 20px;">
               <p style="font-size: 11px; color: #444; letter-spacing: 1px;">DIRECTED BY RELAXSTUDIO × ODF MEDIA</p>
            </div>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'B24 Reunion <tickets@backbenchers24.pro.bd>', 
        to: email,
        subject: `[CONFIRMED] Dossier #${ticketId} - BackBencher's 24`,
        html: emailHtml,
        attachments: [{ filename: `B24_Dossier_${ticketId}.pdf`, content: pdfBuffer }]
      });

      return NextResponse.json({ success: true });
    } 
    
    else if (status === 'rejected') {
      await resend.emails.send({
        from: 'B24 Support <info@backbenchers24.pro.bd>',
        to: email,
        subject: 'Update: Registration Status',
        html: `
          <div style="background-color: #0a0a0a; color: #fff; padding: 40px; font-family: sans-serif; text-align: center;">
            <h2 style="color: #ff4d4d;">VERIFICATION FAILED</h2>
            <p>Dear ${name}, we could not verify your registration for the following reason:</p>
            <p style="background: #1a1a1a; padding: 15px; border-left: 4px solid #ff4d4d; display: inline-block;">${reason}</p>
          </div>
        `
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
