// pages/api/create-checkout-session.js
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_TEST_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { priceID, customerEmail, customerStripeId } = req.body;
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: priceID,
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: `${req.headers.origin}/app/subscription?success=true`,
          cancel_url: `${req.headers.origin}/app/subscription`,
          customer: customerStripeId,
        });
        res.redirect(303, session.url);
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }