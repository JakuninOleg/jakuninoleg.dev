import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 160);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Always deliver to Gmail inbox (Resend "from" is only the sender stamp).
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Portfolio] ${name}`,
      text: [
        `Новая заявка с сайта`,
        ``,
        `Имя: ${name}`,
        `Email: ${email}`,
        `Куда доставлено: ${to}`,
        ``,
        message,
      ].join("\n"),
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
