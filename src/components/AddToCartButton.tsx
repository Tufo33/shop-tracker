"use client"

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export default function AddToCartButton({ product } : { product: Product }) {
    const cart = useCart()

    function handleClick() {
        cart?.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        })
        console.log("warenkorb", cart?.cart)
    }

    return (
        <button onClick={handleClick} className="mt-4 w-full bg-black text-white py-2 rounded-lg "> In den Warenkorb</button>
    )
}