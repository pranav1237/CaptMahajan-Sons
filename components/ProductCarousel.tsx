"use client"
import React from 'react'
// Use local JSON only
// eslint-disable-next-line @typescript-eslint/no-var-requires
const products = require('../data/products.local.json')

export default function ProductCarousel() {
  return (
    <div className="overflow-x-auto flex gap-4 py-4">
      {products.slice(0, 8).map((p: any) => (
        <div key={p.id} className="min-w-[220px] border rounded p-3">
          <img src={p.image} alt={p.name} loading="lazy" className="w-full h-40 object-cover" width={220} height={160} />
          <h4 className="mt-2 font-medium">{p.name}</h4>
          <p className="text-sm text-slate-600">{p.category}</p>
          <button className="mt-3 bg-slate-800 text-white px-3 py-1 rounded">Add To Cart</button>
        </div>
      ))}
    </div>
  )
}
