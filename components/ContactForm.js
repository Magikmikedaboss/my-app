"use client";
import { useRef, useState } from "react";

export default function ContactForm({ plain = false }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const formRef = useRef(null);
  const MAIL_URL = "/api/contact"; // same-origin → no CORS

  async function handleSubmit(e) {
    e.preventDefault();
    const formEl = formRef.current; // <-- capture the element
    if (!formEl) return;
    setStatus("loading");
    try {
      const form = new FormData(formEl);

      // Honeypot
      if ((form.get("website") || "").toString().trim() !== "") {
        setStatus("success");
        formEl.reset(); // <-- use captured element
        return;
      }

      const res = await fetch(MAIL_URL, { method: "POST", body: form });

      let data = null;
      try { data = await res.json(); } catch {}

      if (!res.ok || (data && data.ok === false)) {
        const msg = (data && (data.message || data.error || data.raw)) || `Send failed (HTTP ${res.status})`;
        throw new Error(msg);
      }

      setStatus("success");
      formEl.reset(); // <-- use captured element
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const Card = ({ children }) =>
    plain ? <>{children}</> : <div className="form-card">{children}</div>;

  return (
    <Card>
      {/* Non-JS fallback to same-origin route */}
      <form
        ref={formRef}                // <-- attach the ref
        onSubmit={handleSubmit}
        action={MAIL_URL}
        method="post"
        className="grid gap-4 sm:grid-cols-2 text-left"
        noValidate
      >
        {/* Honeypot (hidden to humans) */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <div>
          <label className="form-label" htmlFor="name">Name</label>
          <input id="name" name="name" required className="form-input" autoComplete="name" placeholder="Jane Doe" />
        </div>

        <div>
          <label className="form-label" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" className="form-input" inputMode="tel" autoComplete="tel" placeholder="(702) 555-1234" />
        </div>

        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="form-input" autoComplete="email" placeholder="you@example.com" />
        </div>

        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="message">Project Details</label>
          <textarea id="message" name="message" rows={5} required className="form-textarea" placeholder="What do you need help with?" />
        </div>

        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={status === "loading"} className="btn btn-primary" aria-busy={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send Request"}
          </button>
          <a href="tel:+1702XXXXXXX" className="btn btn-ghost">📞 Call (702) XXX-XXXX</a>
        </div>

        {status === "success" && <p className="sm:col-span-2 notice-ok">Thanks! I’ll get back to you shortly.</p>}
        {status === "error" && <p className="sm:col-span-2 notice-err">Something went wrong. Please try again.</p>}
      </form>
    </Card>
  );
}
