import { createHash } from 'node:crypto';

export const recipient = 'Uliya_696@mail.ru';
export const origin = 'https://elbebe.ru';
const siteOrigins = [origin, 'https://www.elbebe.ru', 'https://jakuninoleg-elbebe-e1bb.twc1.net'];
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);

export function renderVisitEmail({ name, phone, id, time, source = origin }) {
  const subject = 'Эльбэби — заявка на знакомство';
  const date = new Intl.DateTimeFormat('ru-RU', { dateStyle:'long', timeStyle:'short', timeZone:'Europe/Moscow' }).format(time);
  const rows = [['Имя',name],['Телефон',phone],['Получена',date+' (МСК)'],['Номер заявки',id]];
  const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${subject}</title></head><body style="margin:0;background:#f9f5ed;color:#342041;font:16px Arial,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9f5ed"><tr><td align="center" style="padding:20px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fff;border-radius:20px"><tr><td style="padding:24px;background:#681d87;border-radius:20px 20px 0 0;color:#fff"><p style="margin:0 0 8px;font-size:14px;font-weight:bold">ДЕТСКИЙ САД «ЭЛЬБЭБИ»</p><h1 style="margin:0;font-size:26px;line-height:1.2">Новая заявка на знакомство</h1></td></tr><tr><td style="padding:24px"><p style="margin:0 0 20px;line-height:1.5">Родитель оставил контакт, чтобы договориться о визите.</p>${rows.map(([label,value])=>`<p style="margin:0 0 14px;line-height:1.4;overflow-wrap:anywhere"><span style="color:#69566e;font-size:14px">${label}</span><br><strong>${escape(value)}</strong></p>`).join('')}<p style="margin:24px 0"><a href="tel:${escape(phone)}" style="display:inline-block;padding:13px 20px;background:#681d87;color:#fff;text-decoration:none;border-radius:24px;font-weight:bold">Позвонить</a></p><p style="font-size:13px;line-height:1.5;color:#69566e">Согласие на обработку данных получено. <a href="${escape(source)}/soglasie/" style="color:#681d87">Текст согласия</a>.</p></td></tr></table></td></tr></table></body></html>`;
  return { subject, html, text: [subject, ...rows.map(([label,value])=>label+': '+value), 'Согласие получено: '+source+'/soglasie/'].join('\n') };
}

export function createVisitHandler({ send, allowedOrigins = siteOrigins }) {
  const allowed = new Set(allowedOrigins);
  const attempts = new Map();
  const sent = new Map();
  return async request => {
    const source = request.headers.get('origin') || '';
    const permitted = allowed.has(source);
    const headers = { 'Cache-Control':'no-store', Vary:'Origin', ...(permitted ? {
      'Access-Control-Allow-Origin':source, 'Access-Control-Allow-Methods':'POST, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type, Idempotency-Key',
    } : {}) };
    const reply = (status, ok=false) => Response.json({ ok }, { status, headers });
    if (!permitted) return reply(403);
    if (request.method === 'OPTIONS') return new Response(null,{status:204,headers});
    if (request.method !== 'POST') return reply(405);
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply(415);
    const id = request.headers.get('idempotency-key') || '';
    if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) return reply(400);
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400);
      const chunks = [];
      let size = 0;
      while (true) {
        const {done,value} = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 2048) { await reader.cancel(); return reply(413); }
        chunks.push(value);
      }
      data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return reply(400); }
    const name = typeof data?.name === 'string' ? data.name.trim().replace(/\s+/g,' ') : '';
    const phone = typeof data?.phone === 'string' ? data.phone : '';
    if (name.length < 2 || name.length > 80 || !/^[\p{L}\p{M}][\p{L}\p{M} '’.-]*$/u.test(name)
      || !/^\+7[3-9]\d{9}$/.test(phone) || data?.consent !== true || data?.website !== '') return reply(400);
    const now = Date.now();
    for (const [key,value] of attempts) if (value.until < now) attempts.delete(key);
    for (const [key,value] of sent) if (value.until < now) sent.delete(key);
    const fingerprint = createHash('sha256').update(JSON.stringify([source,name,phone])).digest('hex');
    const previous = sent.get(id);
    if (previous) {
      if (previous.fingerprint !== fingerprint) return reply(409);
      return (await previous.result) ? reply(200,true) : reply(502);
    }
    const ip = (request.headers.get('x-forwarded-for') || '').split(',').at(-1)?.trim() || 'unknown';
    const attempt = attempts.get(ip) || {count:0,until:now+60_000};
    if (attempt.count >= 5 || attempts.size >= 10_000 || sent.size >= 5_000) return reply(429);
    attempt.count++;
    attempts.set(ip,attempt);
    const result = Promise.resolve().then(() => send({to:recipient,id,...renderVisitEmail({name,phone,id,time:new Date(now),source})})).then(ok => ok === true, () => false);
    sent.set(id,{ fingerprint,result,until:now+60*60_000 });
    if (await result) return reply(200,true);
    sent.delete(id);
    return reply(502);
  };
}
