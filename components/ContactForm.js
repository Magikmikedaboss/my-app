"use client";
import { useState } from "react";

export default function ContactForm({ plain = false }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const form = new FormData(e.currentTarget);
      // honeypot check
      if ((form.get("website") || "").toString().trim() !== "") {
        setStatus("success");
        e.currentTarget.reset();
        return;
      }
      const res = await fetch("/api/contact", { method: "POST", body: form });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const Card = ({ children }) =>
    plain ? <>{children}</> : <div className="form-card">{children}</div>;

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 text-left">
        {/* Honeypot field (hidden to humans) */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <div>
          <label className="form-label" htmlFor="name">Name</label>
          <input id="name" name="name" required className="form-input" autoComplete="name" />
        </div>

        <div>
          <label className="form-label" htmlFor="phone">Phone</label>
          <input
            id="phone" name="phone"
            className="form-input"
            inputMode="tel" autoComplete="tel"
            placeholder="(702) 555-1234"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="form-input" autoComplete="email" />
        </div>

        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="message">Project Details</label>
          <textarea id="message" name="message" rows={5} required className="form-textarea" />
        </div>

        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary"
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send Request"}
          </button>

          <a href="tel:+1-702-555-1234" className="btn btn-ghost">📞 Call (702) 555-1234</a>
        </div>

        {status === "success" && (
          <p className="sm:col-span-2 notice-ok">Thanks! I’ll get back to you shortly.</p>
        )}
        {status === "error" && (
          <p className="sm:col-span-2 notice-err">Something went wrong. Please try again.</p>
        )}
      </form>
    </Card>
  );
}
