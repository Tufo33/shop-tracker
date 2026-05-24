"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function Navbar() {
    const cart = useCart()
    const itemCount = cart?.cart.reduce((sum, item) => sum + item.quantity, 0) ?? 0

    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">ShopTracker</h1>
            <Link href={"/checkout"}>
            <div className="flex items-center gap-2">
                🛒
                <span className="bg-white text-black rounded-full px-2 py-1 text-sm font-bold">
                    {itemCount}
                </span>
            </div>
            </Link>
        </nav>
    )
}