"use client"
import React from 'react'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import ProductCarousel from '../components/ProductCarousel'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />

      <section id="products" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Product Categories</h2>
        <CategoryGrid />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <ProductCarousel />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border rounded">Premium Quality</div>
          <div className="p-4 border rounded">Affordable Pricing</div>
          <div className="p-4 border rounded">Expert Guidance</div>
          <div className="p-4 border rounded">Wide Selection</div>
        </div>
      </section>

      <section className="mt-12">
        <ContactSection />
      </section>
    </div>
  )
}
