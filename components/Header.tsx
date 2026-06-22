"use client"
import React from 'react'
import { useCart } from '../store/cartStore'

export default function Header() {
  const toggle = useCart((s: any) => s.toggle)
  const count = useCart((s: any) => s.count)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold">Capt. Mahajan & Sons KotaStone</div>
        <div className="flex items-center gap-3">
          <button onClick={() => toggle(true)} className="relative px-3 py-1 bg-slate-800 text-white rounded">
            Cart
            <span className="ml-2 bg-red-600 text-white rounded-full px-2 text-xs">{count()}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
