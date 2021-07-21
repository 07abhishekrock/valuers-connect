/* Server Side -- Stripe API calls */
const Stripe = require("stripe");
const stripe = new Stripe(
  process.env.
  STRIPE_API_KEY,
  {
    apiVersion: "2020-08-27",
  }
);

function getAllProductsAndPlans() {
  return Promise.all([
    stripe.products.list({}),
    stripe.plans.list({ limit: 50 }),
  ])
    .then((stripeData) => {
      var products = stripeData[0].data;
      var plans = stripeData[1].data;

      plans = plans
        .sort((a, b) => {
          return a.amount - b.amount;
        })
        .map((plan) => {
          let amount = plan.amount;
          return { ...plan, amount };
        });
      products.forEach((product) => {
        const filteredPlans = plans.filter((plan) => {
          return plan.product === product.id;
        });

        product.plans = filteredPlans;
      });

      return products;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
}

async function createCustomerAndSubscription(requestBody, email, token) {
  const customers = await stripe.customers.list({
    limit: 1000,
  });

  let customerId;
  await customers.data.map((value, index) => {
    if (value.email === email) {
      customerId = `${value.id}`;
    }
  });

  if (customerId === null || customerId === undefined) {
    console.log("no customer present");
    return stripe.customers
      .create({
        source: token,
        email: email,
      })
      .then((customer) => {
        stripe.subscriptions
          .create({
            customer: customer.id,
            items: [
              {
                plan: requestBody.id,
              },
            ],
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
  } else {
    console.log("cus true", customerId);
    return await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: requestBody.id,
        },
      ],
    });
  }
}

module.exports = {
  getAllProductsAndPlans,
  createCustomerAndSubscription,
};
