"use client"

export default function DeleteProductButton({ id }: { id: number }) {
    async function handleDelete() {
        await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        })
        window.location.reload()
    }

    return (
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
            Löschen
        </button>
    )
}