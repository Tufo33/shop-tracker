"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types/cartItem";

interface CartContextType {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children } : { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    
    useEffect(() => {
        const saved = localStorage.getItem('cart')
        if (saved) {
            setCart(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item: CartItem) {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === item.id)

            if (exists) {
                return prev.map((i) => 
                i.id === item.id
                    ? { ...i, quantity: i.quantity + 1}
                    : i
            )
            }
            return [...prev, item]
        })
    }

    function clearCart() {
        setCart([])
        localStorage.removeItem("cart")
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}