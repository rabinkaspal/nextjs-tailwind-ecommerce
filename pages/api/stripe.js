const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const params = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                billing_address_collection: "required",
                shipping_options: [
                    { shipping_rate: "shr_1LnP3CCc3aPrlmM3YtgN6IGD" },
                    { shipping_rate: "shr_1LnP50Cc3aPrlmM3NnoMH164" },
                    { shipping_rate: "shr_1LnP5gCc3aPrlmM3eW2hK6dW" },
                ],
                line_items: req.body.map(item => {
                    return {
                        price_data: {
                            currency: "aud",
                            product_data: {
                                name: item.title,
                                images: [item.image],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?cancelled=true`,
            };
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            // res.redirect(303, session.url);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
