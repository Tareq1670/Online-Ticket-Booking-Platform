import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        const formData = await request.formData();
        const payload = formData.get("payload");

        const body = payload
            ? JSON.parse(payload)
            : Object.fromEntries(formData.entries());

        const {
            bookingId,
            ticketTitle,
            totalPrice,
            quantity,
            ticketId,
            userId,
            userEmail,
        } = body;

        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: ticketTitle,
                            description: `Quantity: ${quantity} seat(s)`,
                        },
                        unit_amount: Math.round(Number(totalPrice) * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/success?canceled=true`,
            metadata: {
                bookingId: bookingId,
                ticketId: ticketId,
                userId: userId,
            },
        });
        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 },
        );
    }
}
