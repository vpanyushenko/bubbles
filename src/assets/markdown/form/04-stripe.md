# Stripe

There are many ways to collect payments. At Bubbles our preferred way to process payments is on the backend server instead of the front end. This gives us a lot more flexibility with things like the `application_fee_amount property`, which is a more common use case for dashboards and SaaS products.

Therefore, the only thing that our `stripe-card` input does, is convert the user's credit card into the stripe token ID that you will send to your backend and finalize the transaction.

The process for this is pretty simple. Like any Bubbles `Form` component, you pass in the array of form inputs to the form component as a prop. In the `onsumbit` function of your button, you'll pass in the reference to your array of inputs to the `getFormData` utility you imported. Bubbles will automatically convert the card to the token, and the token will be part of the object returned. They key, as always, being the id you passed to that input.

Any StripeJS dependencies will only load client side after everything else mounts, so there will be no performance penalties for using this component.

Learn more about the `stripe-card` input type [here](/input).
