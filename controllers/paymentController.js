const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount, email } = req.body;
      // console.log(amount)
      // console.log(email)
  
      const customer = await stripe.customers.create({
        email: email,
      });
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        customer: customer.id
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).send({ error: 'Error creating payment intent' });
    }
  });

module.exports = router;
