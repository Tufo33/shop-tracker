"use client"

import { useEffect } from "react"
import { useCart } from "@/context/CartContext"

export default function SuccessPage() {

    const cart = useCart()

    useEffect(() => {
        cart?.clearCart()
    },[])

    return (
        <main className="max-w-2xl mx-auto p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">🎉 Danke für deine Bestellung!</h1>
            <p className="text-gray-500 mb-8">Deine Zahlung war erfolgreich.</p>
            <a href="/" className="mt-8 inline-block bg-black text-white p-3 rounded-lg font-bold text-lg">Homepage</a>
        </main>
    )
}