import AddProductForm from "@/components/AddProductForm";
import DeleteProductButton from "@/components/DeleteProductButton";
import pool from "@/lib/db";

export default async function AdminPage() {
    const products = (await pool.query('SELECT * FROM products')).rows
    const orders = (await pool.query('SELECT * FROM orders')).rows

    return ( 
        <main className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
            <h2 className="text-2xl font-bold mb-4">Produkte</h2>
            <AddProductForm/>
            <table className="w-full border mb-12">
                <thead>
                    <tr className="bg-gray-100 text-black">
                        <td className="p-3 text-left">Name</td>
                        <td className="p-3 text-left">Preis</td>
                        <td className="p-3 text-left">Lager</td>
                        <td className="p-3 text-left">Aktion</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-t">
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">{product.price}</td>
                            <td className="p-3">{product.stock}</td>
                            <td className="p-3">
                                <DeleteProductButton id={product.id}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="text-2xl font-bold mb-4">Bestellungen</h2>
                <table className="w-full border mb-12">
                    <thead>
                        <tr className="bg-gray-100 text-black">
                            <th className="p-3 text-left">Kunden Name</th>
                            <th className="p-3 text-left">Kunden Email</th>
                            <th className="p-3 text-left">Gesamter Preis</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3">{order.customer_name}</td>
                                <td className="p-3">{order.customer_email}</td>
                                <td className="p-3">{order.total_price}</td>
                                <td className="p-3">{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </main>
    )
    
}