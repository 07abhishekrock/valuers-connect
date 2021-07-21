
const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe(
  process.env.
  STRIPE_API_KEY,
  {
    apiVersion: "2020-08-27",
  }
);
const User = require("../models/userModel");
const router = express.Router();
const STRIPE_API = require("./stripeFunctions/stripe-functions");

router.get("/getPlans", (req, res) => {
  STRIPE_API.getAllProductsAndPlans()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
});

router.post("/processPayment", async (req, res) => {
  let token = req.body.token;
  let email = req.body.email;
  let plan = req.body.plan;

  const customers = await stripe.customers.list({
    limit: 1000,
  });

  let customerId;
  await customers.data.map((value, index) => {
    if (value.email === email) {
      customerId = `${value.id}`;
      console.log(value);
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
        const subscriptions = stripe.subscriptions
          .create({
            customer: customer.id,
            items: [
              {
                plan: plan.id,
              },
            ],
            expand: ["latest_invoice.payment_intent"],
          })
          .then((data) => {
            const status = data["latest_invoice"]["payment_intent"]["status"];
            const client_secret =
              data["latest_invoice"]["payment_intent"]["client_secret"];
            if (status == "succeeded") {
              res.json({ msg: "Payment Success" });
            } else {
              res.json({ msg: "Payment Failed" });
            }
          })
          .catch((err) => {
            console.log(err.message);
            res.json({ msg: err.message });
          });
      });
  } else {
    console.log("cus true", token);
    const customer = await stripe.customers
      .update(customerId, {
        source: token,
      })
      .then((data) => {
        console.log("Card updated");
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: err.message });
      });
    await stripe.subscriptions
      .create({
        customer: customerId,
        items: [
          {
            plan: plan.id,
          },
        ],
        expand: ["latest_invoice.payment_intent"],
      })
      .then((data) => {
        const status = data["latest_invoice"]["payment_intent"]["status"];
        const client_secret =
          data["latest_invoice"]["payment_intent"]["client_secret"];
        if (status == "succeeded") {
          res.json({ msg: "Payment Success" });
        } else {
          res.json({ msg: "Payment Failed" });
        }
      })
      .catch((err) => {
        res.json({ msg: err.message });
      });
  }
});

router.post("/webhook", async (req, res) => {
  const event = req.body;
  let customer;
  let subscription;
  console.log(event.type);
  if (
    event.type === "payment_intent.payment_failed" ||
    event.type === "payment_intent.succeeded"
  ) {
    let customerId = event.data.object.customer;
    let invoiceId = event.data.object.invoice;
    customer = await stripe.customers.retrieve(customerId);
    const invoice = await stripe.invoices.retrieve(invoiceId);
    const subId = invoice.subscription;
    subscription = await stripe.subscriptions.retrieve(subId);
  }

  switch (event.type) {
    case "payment_intent.payment_failed":
      const failed_email = customer.email;
      const customerId_fail = event.data.object.customer;
      const subscriptions = await stripe.subscriptions.list({
        limit: 1000,
      });

      let subscription_fail = [];
      subscriptions.data.map(async (value, index) => {
        if (value.customer === customerId_fail && value.status === "active") {
          subscription_fail.push(value);
        }
      });
      console.log("length", subscription_fail.length);
      if (subscription_fail.length >= 1) {
        const email = failed_email;
        const subEndDate = new Date(
          subscription_fail[0].current_period_end * 1000
        );
        const subStartDate = new Date(
          subscription_fail[0].current_period_start * 1000
        );
        const subType = `${(subscription_fail[0].plan.amount / 100).toFixed(
          2
        )} ${subscription_fail[0].plan.currency} / ${
          subscription_fail[0].plan.interval_count
        } ${subscription_fail[0].plan.interval}`;
        console.log("inside if", subscription_fail[0].current_period_end);

        await User.findOneAndUpdate(
          { email: email },
          {
            isMember: true,
            planExpires: subEndDate,
            subscriptionType: subType,
            subscibedOn: subStartDate,
          }
        )
          .then((data) => {
            console.log("success", data);
            return res.sendStatus(200);
          })
          .catch((err) => {
            console.log("err", err.message);
            return res.sendStatus(500);
          });
      } else {
        await User.findOneAndUpdate(
          { email: failed_email },
          { isMember: false, subscriptionType: "" }
        )
          .then((data) => {
            console.log("failed", data);
            return res.sendStatus(200);
          })
          .catch((err) => {
            console.log(err.message);
            return res.sendStatus(500);
          });
      }

      break;
    case "payment_intent.succeeded":
      console.log("payment_success", req.body.data.object);
      const email = customer.email;
      const subEndDate = new Date(subscription.current_period_end * 1000);
      const subStartDate = new Date(subscription.current_period_start * 1000);
      const subType = `${(subscription.plan.amount / 100).toFixed(2)} ${
        subscription.plan.currency
      } / ${subscription.plan.interval_count} ${subscription.plan.interval}`;

      await User.findOneAndUpdate(
        { email: email },
        {
          isMember: true,
          planExpires: subEndDate,
          subscriptionType: subType,
          subscibedOn: subStartDate,
        }
      )
        .then((data) => {
          console.log("success", data);
          return res.sendStatus(200);
        })
        .catch((err) => {
          res.json({ msg: err.message });
          return res.sendStatus(500);
        });

      break;
    case "customer.subscription.deleted":
      const invoiceId = event.data.object.latest_invoice;
      const customerId = event.data.object.customer;

      let cus_email;
      await stripe.customers
        .retrieve(customerId)
        .then((result) => {
          cus_email = result.email;
        })
        .catch((err) => {
          res.json({ msg: err.message });
          return res.sendStatus(500);
        });

      let intentId;
      await stripe.paymentIntents
        .list({
          limit: 100,
          customer: customerId,
        })
        .then((result) => {
          result.data.map((value, index) => {
            if (value.invoice === invoiceId) {
              intentId = value.id;
            }
          });
        })
        .catch((err) => {
          res.json({ msg: err.message });
          return res.sendStatus(500);
        });

      await stripe.refunds
        .create({
          payment_intent: intentId,
        })
        .then(async (data) => {
          const subscriptions = await stripe.subscriptions.list({
            limit: 1000,
          });

          let subscription_cancel = [];
          subscriptions.data.map(async (value, index) => {
            if (value.customer === customerId && value.status === "active") {
              subscription_cancel.push(value);
            }
          });
          let length = subscription_cancel.length;
          console.log("len", length);
          if (length === 0) {
            await User.findOneAndUpdate(
              { email: cus_email },
              { isMember: false, subscriptionType: "" }
            )
              .then((data) => {
                console.log("failed", data);
                return res.sendStatus(200);
              })
              .catch((err) => {
                res.json({ msg: err.message });
                return res.sendStatus(500);
              });
          } else {
            console.log(
              "inside ellse",
              subscription_cancel[0].current_period_end
            );
            const email = cus_email;
            const subEndDate = new Date(
              subscription_cancel[0].current_period_end * 1000
            );
            const subStartDate = new Date(
              subscription_cancel[0].current_period_start * 1000
            );
            const subType = `${(
              subscription_cancel[0].plan.amount / 100
            ).toFixed(2)} ${subscription_cancel[0].plan.currency} / ${
              subscription_cancel[0].plan.interval_count
            } ${subscription_cancel[0].plan.interval}`;

            await User.findOneAndUpdate(
              { email: email },
              {
                isMember: true,
                planExpires: subEndDate,
                subscriptionType: subType,
                subscibedOn: subStartDate,
              }
            )
              .then((data) => {
                console.log("success", data);
                return res.sendStatus(200);
              })
              .catch((err) => {
                res.json({ msg: err.message });
                return res.sendStatus(500);
              });
          }
        })
        .catch((err) => {
          return res.sendStatus(500);
        });

      break;
    case "invoice.paid":
      console.log("invoice paid");

      res.sendStatus(200);
      break;
    case "invoice.payment_failed":
      console.log("invoice payment failed");
      res.sendStatus(200);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      return res.sendStatus(200);
  }
});

router.post("/cancelSubscription", async (req, res) => {
  const customers = await stripe.customers.list({
    limit: 1000,
  });

  let customerId;
  await customers.data.map((value, index) => {
    if (value.email === req.body.email) {
      customerId = `${value.id}`;
    }
  });

  if (customerId === null || customerId === undefined) {
    return res.json({ msg: "No Customer found for this data" });
  }

  console.log(customerId);

  const subscriptions = await stripe.subscriptions.list({
    limit: 1000,
  });

  let subscriptionId;
  subscriptions.data.map((value, index) => {
    if (value.customer === customerId) {
      if (value.plan.amount === req.body.amount * 100) {
        subscriptionId = `${value.id}`;
        console.log(value);
      }
    }
  });
  console.log(subscriptionId);
  if (subscriptionId === null || subscriptionId === undefined) {
    return res.json({
      msg: "No Subscription details found for this given data",
    });
  }

  const deleted = await stripe.subscriptions
    .del(subscriptionId)
    .then((data) => {
      res.json({ msg: "subscription cancelled successfuly" });
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
});

module.exports = router;


// router.get("/invoice",async (req,res)=>{
//   const result = await stripe.invoices.retrieve("in_1ItrnGSCVLqlh99GTxuA1XfS");
//   console.log(result);
// })

// router.get("/sendEmail",async(req,res)=>{
//   let newUser = { "email": "sandymech290023@gmail.com"};
//   var emailVerifyURL=	`${req.protocol}/registration`;
//   await new Email(newUser,emailVerifyURL).sendWelcome()
//   .then((data)=>{
//     console.log(data)
//   }).catch((err)=>{
//     console.log(err);
//   })
// })
//failure card
// 4000000000000341
