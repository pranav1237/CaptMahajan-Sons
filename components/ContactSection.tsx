"use client"
import React, { useState } from 'react'
import { sendOrderEmail } from '../lib/emailjs'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // Send via EmailJS then open WhatsApp after success
    try {
      const res = await sendOrderEmail({ name, phone, items: [] })
      if (res && res.ok) {
        const wa = `https://wa.me/919785843101?text=${encodeURIComponent(`Hello Capt. Mahajan & Sons,%0A%0ACustomer Name: ${name}%0APhone: ${phone}%0A%0AInquiry:%0A${message}`)}`
        window.open(wa, '_blank')
      } else {
        alert('Failed to send email. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to send inquiry')
    }
  }

  return (
    <div className="border rounded p-6">
      <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
      <div className="mb-2">Phone: 9785843101</div>
      <div className="mb-2">Email: chander151973@gmail.com</div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-2" aria-label="inquiry-form">
        <input value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Name" className="p-2 border rounded" />
        <input value={phone} onChange={(e: any) => setPhone(e.target.value)} placeholder="Phone" className="p-2 border rounded" />
        <textarea value={message} onChange={(e: any) => setMessage(e.target.value)} placeholder="Message" className="p-2 border rounded" />
        <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded">Send Inquiry</button>
      </form>
    </div>
  )
}
