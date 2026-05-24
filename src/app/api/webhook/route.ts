import { NextResponse } from "next/server";
import Stripe from "stripe";
import pool from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST (request: Request) {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        return NextResponse.json({ error: "Webhook Error" }, { status: 400})
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        await pool.query(
            `INSERT INTO orders (customer_name, customer_email, total_price, status) 
       VALUES ($1, $2, $3, $4)`,
      [
        session.customer_details?.name ?? "Unbekannt",
        session.customer_details?.email ?? "Unbekannt", 
        (session.amount_total ?? 0) / 100,
        "paid"
      ]
        )
    }

    return NextResponse.json({ received: true })
}