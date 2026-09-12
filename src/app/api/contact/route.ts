import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  locale?: string;
  company?: string; // honeypot — must stay empty
  consent?: boolean;
};

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function mailCopy(locale: string, name: string, email: string, message: string, to: string) {
  if (locale === "en") {
    return {
      subject: `[Portfolio] ${name}`,
      text: [
        "New message from the portfolio site",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Delivered to: ${to}`,
        "",
        message,
      ].join("\n"),
    };
  }

  return {
    subject: `[Portfolio] ${name}`,
    text: [
      "Новая заявка с сайта",
      "",
      `Имя: ${name}`,
      `Email: ${email}`,
      `Куда доставлено: ${to}`,
      "",
      message,
    ].join("\n"),
  };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots fill hidden fields — accept silently.
  if (String(body.company ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 160);
  const message = String(body.message ?? "").trim().slice(0, 1500);
  const locale = body.locale === "en" ? "en" : "ru";
  const consent = body.consent === true;

  if (!name || !email || !message || !isEmail(email) || !consent) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const copy = mailCopy(locale, name, email, message, to);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: copy.subject,
      text: copy.text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
