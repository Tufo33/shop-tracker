import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    const result = await pool.query('SELECT * FROM products')
    return NextResponse.json(result.rows)
}

export async function POST(request: Request) {
    const { name, price, stock, category, description } = await request.json()

    await pool.query(
        'INSERT INTO products (name, price, stock, category, description) VALUES ($1, $2, $3, $4, $5)',
        [name, price, stock, category, description]
    )

    return NextResponse.json({ success: true })
}