"use client"
import React from 'react'

type Props = {
  id: number
  name: string
  image: string
  description?: string
}

export default function ProductCard({ id, name, image, description }: Props) {
  return (
    <div className="border rounded p-3">
      <img src={image} alt={name} loading="lazy" className="w-full h-40 object-cover" width={300} height={160} />
      <h4 className="mt-2 font-medium">{name}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}
