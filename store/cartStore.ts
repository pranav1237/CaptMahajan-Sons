"use client"
import { create } from 'zustand'

type CartItem = { id: number; name: string; qty: number }

type State = {
  items: CartItem[]
  visible: boolean
  add: (item: CartItem) => void
  updateQty: (id: number, qty: number) => void
  toggle: (v?: boolean) => void
  count: () => number
  remove: (id: number) => void
}

export const useCart = create<State>((set, get) => ({
  items: [],
  visible: false,
  add: (item) => set((s) => {
    const exists = s.items.find(i => i.id === item.id)
    if (exists) {
      return { items: s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i) }
    }
    return { items: [...s.items, item] }
  }),
  updateQty: (id, qty) => set((s) => ({ items: s.items.map(i => i.id === id ? { ...i, qty } : i) })),
  toggle: (v) => set((s) => ({ visible: typeof v === 'boolean' ? v : !s.visible })),
  count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) }))
}))
