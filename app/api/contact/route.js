// app/api/contact/route.js
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Forward to your PHP endpoint on Bluehost (Titan SMTP lives behind this)
const UPSTREAM = "https://mikesprohandyman.com/api/submit.php";

export async function POST(req) {
  try {
    const fd = await req.formData();

    // Honeypot: quiet success for bots
    if ((fd.get("website") || "").toString().trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Send as x-www-form-urlencoded (WAF-friendly)
    const params = new URLSearchParams();
    for (const [k, v] of fd.entries()) {
      if (typeof v === "string") params.append(k, v);
    }

    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json, text/plain, */*",
      },
      body: params.toString(),
      cache: "no-store",
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { ok: upstream.ok, raw: text }; }

    return NextResponse.json(
      { ...data, upstreamStatus: upstream.status },
      { status: upstream.status || (upstream.ok ? 200 : 500) }
    );
  } catch (err) {
    console.error("Proxy error /api/contact:", err);
    return NextResponse.json({ ok: false, error: "Proxy failed" }, { status: 502 });
  }
}
