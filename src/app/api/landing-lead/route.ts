import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

export const runtime = "nodejs";

const allowedOrigins = new Set([
  "http://vneshablona.ru",
  "https://vneshablona.ru",
  "http://www.vneshablona.ru",
  "https://www.vneshablona.ru",
]);
const maxBodyLength = 16_000;
const maxFields = 30;
const windowMs = 60_000;
const maxPerWindow = 5;
const hits = new Map<string, number[]>();

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

function json(origin: string, body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: corsHeaders(origin) });
}

function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  return allowedOrigins.has(origin) ? origin : null;
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= maxPerWindow) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function fieldValue(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return value ? "Да" : "Нет";
  if (value === null || value === undefined) return "";
  return JSON.stringify(value);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function OPTIONS(request: Request) {
  const origin = allowedOrigin(request);
  if (!origin) return new Response(null, { status: 403, headers: { Vary: "Origin" } });
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(request: Request) {
  const origin = allowedOrigin(request);
  if (!origin) {
    return NextResponse.json({ ok: false, error: "forbidden_origin" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json(origin, { ok: false, error: "invalid_content_type" }, 415);
  }

  let fields: [string, string][];
  try {
    const raw = await request.text();
    if (raw.length > maxBodyLength) return json(origin, { ok: false, error: "payload_too_large" }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json(origin, { ok: false, error: "validation" }, 400);
    }
    const entries = Object.entries(parsed);
    if (entries.length > maxFields) return json(origin, { ok: false, error: "too_many_fields" }, 400);
    fields = entries
      .map(([key, value]) => [key.trim().slice(0, 80), fieldValue(value).slice(0, 1500)] as [string, string])
      .filter(([key, value]) => key && value);
    if (!fields.length) return json(origin, { ok: false, error: "validation" }, 400);
  } catch {
    return json(origin, { ok: false, error: "invalid_json" }, 400);
  }

  if (rateLimited(clientIp(request))) {
    return json(origin, { ok: false, error: "rate_limited" }, 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return json(origin, { ok: false, error: "not_configured" }, 503);
  }

  const source = new URL(origin).hostname;
  const replyTo = fields.map(([, value]) => value).find(isEmail);
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL?.trim() || site.email],
      ...(replyTo ? { replyTo } : {}),
      subject: `Новая заявка с ${source}`,
      text: [
        `Источник: ${origin}`,
        "",
        ...fields.map(([key, value]) => `${key}: ${value}`),
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return json(origin, { ok: false, error: "send_failed" }, 502);
    }
    return json(origin, { ok: true, id: data?.id });
  } catch (error) {
    console.error("Resend error:", error);
    return json(origin, { ok: false, error: "send_failed" }, 502);
  }
}
