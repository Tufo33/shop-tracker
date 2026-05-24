import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
    const { items } = await request.json()

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item: any) => ({
            price_data: {
                currency: "eur",
                product_data: { name: item.name},
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        })),
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/checkout",
    })

    return NextResponse.json({ url: session.url })
}