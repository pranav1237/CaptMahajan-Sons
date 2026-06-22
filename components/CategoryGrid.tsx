"use client"
import React from 'react'
// Use local JSON only (download-images generates products.local.json / categories.local.json)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const products = require('../data/products.local.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const categories = require('../data/categories.local.json')
import { motion } from 'framer-motion'
import { useCart } from '../store/cartStore'

export default function CategoryGrid() {
  const add = useCart((s: any) => s.add)
  const toggle = useCart((s: any) => s.toggle)

  const addCategoryToCart = (cat: any) => {
    // Add a representative category item to cart (qty 1) and open drawer
    add({ id: 1000 + cat.id, name: cat.name, qty: 1 })
    toggle(true)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((cat: any) => {
        const pics = products.filter((p: any) => p.category === cat.slug).slice(0, 4)
        return (
          <div key={cat.id} className="border rounded overflow-hidden bg-white">
            {pics.length > 0 ? (
              <div className="grid grid-cols-2 gap-1 h-40 overflow-hidden">
                {pics.map((p: any) => (
                  <img key={p.id} src={p.image} alt={p.name} loading="lazy" className="w-full h-20 object-cover" width={150} height={80} />
                ))}
              </div>
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-500">No images</div>
            )}

            <div className="p-4 flex flex-col items-start">
              <h3 className="font-semibold">{cat.name}</h3>
              <a href={`/products/${cat.slug}`} className="text-sm text-slate-600 mt-2 inline-block">View Products</a>

              <motion.button
                whileHover={{ scale: 1.06, rotateX: -8, boxShadow: '0 20px 30px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.98, rotateX: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="mt-4 px-4 py-2 bg-gradient-to-br from-slate-800 to-slate-600 text-white rounded shadow-2xl transform-gpu"
                onClick={() => addCategoryToCart(cat)}
                aria-label={`Add ${cat.name} to cart`}
              >
                <span className="pointer-events-none">Add To Cart</span>
              </motion.button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
