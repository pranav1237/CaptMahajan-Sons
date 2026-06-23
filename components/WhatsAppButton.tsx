import React from 'react'

export default function WhatsAppButton() {
  const number = '+919785843101'
  const message = encodeURIComponent('Hello Capt. Mahajan & Sons, I would like to enquire about your products.')
  const href = `https://wa.me/${number}?text=${message}`

  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="message-us-on-whatsapp">
      <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 60 }}>
        <button className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform">
          Message Us
        </button>
      </div>
    </a>
  )
}
