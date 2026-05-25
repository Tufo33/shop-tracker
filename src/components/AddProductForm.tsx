"use client"

import { useState } from "react"

export default function AddProductForm() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    async function handleSubmit() {
        await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, stock, category, description })
        })
        window.location.reload()
    }

    return(
        <div className="mb-12 p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Produkt hinzufügen</h2>
            <div className="grid grid-cols-2 gap-4">
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value) } className="border p-2 rounded"/>
                <input placeholder="Preis" value={price} onChange={(e) => setPrice(e.target.value) } className="border p-2 rounded"/>
                <input placeholder="Lager" value={stock} onChange={(e) => setStock(e.target.value) } className="border p-2 rounded"/>
                <input placeholder="Kategorie" value={category} onChange={(e) => setCategory(e.target.value) } className="border p-2 rounded"/>
                <input placeholder="Beschreibung" value={description} onChange={(e) => setDescription(e.target.value) } className="border p-2 rounded col-span-2"/>
                <button className="col-span-2 bg-black text-white py-2 rounded" onClick={handleSubmit}>
                    Produkt hinzufügen
                </button>
            </div>
        </div>
    )
}