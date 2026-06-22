"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../store/cartStore'

export default function CartDrawer() {
  const visible = useCart((s: any) => s.visible)
  const toggle = useCart((s: any) => s.toggle)
  const items = useCart((s: any) => s.items)
  const updateQty = useCart((s: any) => s.updateQty)
  const remove = useCart((s: any) => s.remove)

  const totalCount = items.reduce((acc: number, i: any) => acc + i.qty, 0)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [sending, setSending] = React.useState(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Cart</h3>
            <button onClick={() => toggle(false)} className="text-slate-600">Close</button>
          </div>

          <div className="space-y-3">
            {items.length === 0 ? (
              <div className="text-sm text-slate-600">Your cart is empty</div>
            ) : (
              items.map((it: any) => (
                <div key={it.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                      <button aria-label={`decrease-${it.id}`} onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span>Qty: {it.qty}</span>
                      <button aria-label={`increase-${it.id}`} onClick={() => updateQty(it.id, it.qty + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button aria-label={`remove-${it.id}`} onClick={() => remove(it.id)} className="text-sm text-red-600">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">Total Items</div>
              <div className="font-semibold">{totalCount}</div>
            </div>

            <div className="mt-3 space-y-2">
              <input value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Your Name" aria-label="customer-name" className="w-full p-2 border rounded" />
              <input value={phone} onChange={(e: any) => setPhone(e.target.value)} placeholder="Phone" aria-label="customer-phone" className="w-full p-2 border rounded" />

              <button
                onClick={async () => {
                  if (!name || !phone) {
                    alert('Please enter your name and phone')
                    return
                  }
                  setSending(true)
                  try {
                    // Build WhatsApp message with order details
                    const lines = [
                      `Hello Capt. Mahajan & Sons,`,
                      `Customer Name: ${name}`,
                      `Phone: ${phone}`,
                      ``,
                      `Interested Products:`
                    ]
                    if (items.length > 0) {
                      items.forEach((it: any) => lines.push(`- ${it.name} x${it.qty}`))
                    } else {
                      lines.push('- General inquiry (no specific product selected)')
                    }
                    lines.push('', 'Please contact me.')
                    const wa = `https://wa.me/919784853101?text=${encodeURIComponent(lines.join('\n'))}`
                    window.open(wa, '_blank')
                    toggle(false)
                  } catch (err) {
                    console.error(err)
                    alert('Failed to open WhatsApp. Please try again.')
                  } finally {
                    setSending(false)
                  }
                }}
                disabled={sending}
                className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
              >
                {sending ? 'Opening WhatsApp...' : 'Send Order'}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
