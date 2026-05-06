import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { jsPDF } from "jspdf";

const resend = new Resend('re_USBt3RXV_Ma64Cp2CLLSZoDCyREukNz2n');

export async function POST(req: Request) {
  const { email, name, phone, school, board, batch, trxId, ticketId, status } = await req.json();

  if (status === 'approved') {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [600, 400] // তথ্য বেশি তাই হাইট একটু বাড়ানো হয়েছে
    });

    // ১. ব্যাকগ্রাউন্ড (কালো)
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 600, 400, 'F');

    // ২. লোগো সেকশন (বামে পাশাপাশি সমান্তরাল)
    // লোগোর Base64 এখানে বসাবে
    const logoSize = 40;
    doc.addImage("BASE64_RELAX_STUDIO", 'PNG', 20, 20, logoSize, logoSize); 
    doc.addImage("BASE64_B24_LOGO", 'PNG', 70, 20, logoSize, logoSize);

    // ৩. স্কুইড গেম আইকন (ডানে)
    doc.setTextColor(255, 0, 90); // পিঙ্ক (#FF005A)
    doc.setFontSize(35);
    doc.text("○  △  □", 460, 50);

    // ৪. টিকেটের শিরোনাম
    doc.setDrawColor(255, 0, 90);
    doc.line(20, 75, 580, 75); // ডিভাইডার
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("PARTICIPANT DOSSIER", 20, 100);

    // ৫. এ টু জেড ইনফরমেশন সেকশন
    doc.setFontSize(12);
    const startY = 130;
    const lineHeight = 20;

    const info = [
      { label: "NAME", value: name.toUpperCase() },
      { label: "PHONE", value: phone },
      { label: "EMAIL", value: email },
      { label: "INSTITUTION", value: school.toUpperCase() },
      { label: "BOARD", value: board },
      { label: "SSC BATCH", value: batch },
      { label: "TRANSACTION ID", value: trxId.toUpperCase() },
      { label: "TICKET ID", value: `#${ticketId}` }
    ];

    info.forEach((item, index) => {
      doc.setTextColor(255, 0, 90); // লেবেল পিঙ্ক
      doc.text(`${item.label}:`, 20, startY + (index * lineHeight));
      doc.setTextColor(255, 255, 255); // ভ্যালু সাদা
      doc.text(String(item.value), 140, startY + (index * lineHeight));
    });

    // ৬. সিকিউরিটি নোট ও ওয়াটারমার্ক
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("SECURITY PROTOCOL: DO NOT DUPLICATE THIS DOCUMENT.", 20, 360);
    doc.setTextColor(255, 0, 90);
    doc.setFontSize(80);
    doc.text("□", 520, 380, { angle: 0, charSpace: 0 }); // ব্যাকগ্রাউন্ড সিম্বল

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // ৭. ইমেইল পাঠানো
    await resend.emails.send({
      from: 'B24 Reunion <tickets@backbenchers24.pro.bd>',
      to: email,
      subject: `Your Player Invitation: #${ticketId}`,
      html: `<p>Greetings <b>${name}</b>, your payment is verified. Your dossier is attached below.</p>`,
      attachments: [{ filename: `B24_Ticket_${ticketId}.pdf`, content: pdfBuffer }]
    });

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Invalid status" });
}
