import { NextResponse } from 'next/server'
import { sendOrderEmail } from '../../../lib/emailjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, items } = body || {}
    if (!name || !phone) return NextResponse.json({ ok: false, error: 'missing' }, { status: 400 })

    const result = await sendOrderEmail({ name, phone, items })
    return NextResponse.json({ ok: !!result.ok })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
