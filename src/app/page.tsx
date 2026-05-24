import Image from "next/image";
import pool from "@/lib/db";
import { Product } from "@/types/product";

export default async function Home() {

  const result = await pool.query('SELECT * FROM products')
  const products: Product[] = result.rows

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">ShopTracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-green-600 font-bold mt-4">{product.price} €</p>
          <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">In den Warenkorb</button>
        </div>
      ))}
      </div>
    </main>
  );
}
