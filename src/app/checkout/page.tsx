"use client"

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const cart = useCart()
    const items = cart?.cart
    const total = items?.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <main className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Warenkorb</h1>
            {items?.map((item) => (
                <div key={item.id} className="flex justify-between border-b py-4 gap-8">
                    <span >{item.name} x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
            ))}
            <div className="mt-8 text-xl font-bold">Gesamt: {total?.toFixed(2)}</div>
        </main>
    )
}