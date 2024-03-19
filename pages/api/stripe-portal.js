// pages/api/create-checkout-session.js
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_TEST_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { customerStripeId } = req.body;

      const session = await stripe.billingPortal.sessions.create({
        customer: customerStripeId,
        return_url: `${req.headers.origin}/app/subscription`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
