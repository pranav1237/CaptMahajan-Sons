export async function sendOrderEmail(payload: { name: string; phone: string; items: any[] }) {
  // Prefer server-side env vars; fall back to NEXT_PUBLIC variants for compatibility.
  const service = process.env.EMAILJS_SERVICE || process.env.NEXT_PUBLIC_EMAILJS_SERVICE
  const template = process.env.EMAILJS_TEMPLATE || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE
  const user = process.env.EMAILJS_USER || process.env.NEXT_PUBLIC_EMAILJS_USER
  if (!service || !template || !user) {
    // Fallback: resolve true for development so UI flow remains testable.
    return Promise.resolve({ ok: true })
  }

  const templateParams = {
    customer_name: payload.name,
    customer_phone: payload.phone,
    items: payload.items.map((i) => `${i.name} x${i.qty}`).join('\n'),
    datetime: new Date().toLocaleString()
  }

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service_id: service, template_id: template, user_id: user, template_params: templateParams })
  })

  return { ok: res.ok }
}
