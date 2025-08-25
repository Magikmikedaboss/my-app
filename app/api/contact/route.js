// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const phone = (form.get("phone") || "").toString().trim();
    const message = (form.get("message") || "").toString().trim();

    // Honeypot to block bots
    const website = (form.get("website") || "").toString().trim();
    if (website) {
      // silently ignore bot submissions
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const subject = `New website lead from ${name}`;
    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
        <h2>New Website Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        <p style="color:#888;font-size:12px">TS: ${new Date().toISOString()}</p>
      </div>
    `;

    // Send email to you
    await resend.emails.send({
      from: "Website Lead <noreply@yourdomain.com>",
      to: process.env.CONTACT_TO,
      reply_to: email, // so you can reply directly
      subject,
      html,
    });

    // Optional: forward to Google Sheet webhook (if set)
    if (process.env.LEADS_WEBHOOK_URL) {
      // fire-and-forget; we don't block the response on this
      fetch(process.env.LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, ts: Date.now() }),
        cache: "no-store"
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
tesr123