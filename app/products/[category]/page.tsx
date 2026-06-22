"use client"
import React from 'react'
// Use local JSON only
// eslint-disable-next-line @typescript-eslint/no-var-requires
const products = require('../../../data/products.local.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const categories = require('../../../data/categories.local.json')
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const cat = categories.find((c: any) => c.slug === category)
  if (!cat) return notFound()

  const items = products.filter((p: any) => p.category === category)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{cat.name}</h1>
        <motion.a
          href="/"
          whileHover={{ scale: 1.06, rotateX: -8 }}
          whileTap={{ scale: 0.98, rotateX: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="px-4 py-2 bg-gradient-to-br from-slate-800 to-slate-600 text-white rounded shadow-2xl transform-gpu"
        >
          HomePage
        </motion.a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((p: any) => (
          <div key={p.id} className="border rounded overflow-hidden bg-white p-3">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
            <h3 className="mt-2 font-medium">{p.name}</h3>
            <p className="text-sm text-slate-600">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
