import { createVisitHandler } from './lead.mjs';

export const runtime = 'nodejs';

const handle = createVisitHandler({
  async send({ to, subject, text, html, id }) {
    const key = process.env.RESEND_API_KEY;
    if (!key) return false;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `elbebe-${id}`,
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ from: 'Детский сад «Эльбэби» <forms@jakuninoleg.dev>', to: [to], subject, text, html }),
    });
    return response.ok && typeof (await response.json()).id === 'string';
  },
});
export async function POST(request) { return handle(request); }
export async function OPTIONS(request) { return handle(request); }
