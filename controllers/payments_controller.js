const User = require("../models/user");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentMailer = require("../mailers/payment_mailer");
const { log } = require("console");

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_t5oFDruF5oObDd",
  key_secret: "hUKKobvCPfMAva91M4gEAETA",
});

const renderCheckoutPage = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    const selectedService = req.query.service_selected;
    const price = req.query.price;

    console.log(selectedService);
    return res.render("checkout", {
      title: "Checkout Page",
      profile_user: user,
      selected_service: selectedService,
      price: price,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { order_id, amount, payment_capture, currency } = req.body;
    console.log(req.body);
    const options = {
      receipt: order_id,
      amount: amount * 100,
      currency: currency,
      payment_capture: payment_capture,
    };

    console.log(options);
    const order = await razorpayInstance.orders.create(options);
    if (!order) return res.status(500).send("some error occured");

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.log(err);
  }
};

const cardDetail = async (req, res, next) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: "rzp_test_t5oFDruF5oObDd",
      key_secret: "hUKKobvCPfMAva91M4gEAETA",
    });

    const { payment_id } = req.body;
    const order = await razorpayInstance.payments.fetch(payment_id);
    if (!order) return res.status(500).send("some error occured");

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.log(err);
  }
};

const verify = async (req, res) => {
  let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var expectedSignature = crypto
    .createHmac("sha256", razorpayInstance.key_secret)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === req.body.razorpay_signature) {
    // res.send({ code: 200, message: "Signature Valid" });
    // const user = req.user;
    console.log("Signature Virified");
    res.redirect(`http://localhost:8001/payments/success`);
    console.log("Signature Virified fhfhf");

    const user = req.user;
    const payment_id = req.body.razorpay_payment_id;

    try {
      const paymentDetails = await fetchPaymentDetails(payment_id);
      // console.log("Payment Time:", paymentDetails.formattedDate);
      // console.log("Payment Method:", paymentDetails.method);
      const payment_time = paymentDetails.formattedDate;
      const payment_method = paymentDetails.method;
      const payment_amount = paymentDetails.formattedAmount;

      paymentMailer.newReceipt(
        user,
        payment_amount,
        payment_id,
        payment_time,
        payment_method
      );
    } catch (err) {
      console.log("Error fetching payment details:", err);
    }
  } else {
    res.send({ code: 500, message: "Signature Invalid" });
  }
};

const success = (req, res) => {
  // req.logout();

  return res.render("payment_success", {
    title: "payment_success",
  });
};

const fetchPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpayInstance.payments.fetch(paymentId);
    if (payment && payment.amount && payment.method && payment.created_at) {
      const amount = payment.amount / 100;
      const formattedAmount = amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
      const paymentTime = new Date(payment.created_at * 1000); // Convert UNIX timestamp to JavaScript Date object
      // Convert the payment time string to a Date object
      const date = new Date(paymentTime);
      const method = payment.method;
      // Options for formatting the date
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZoneName: "short",
      };

      // Format the date using Intl.DateTimeFormat
      const dateFormatter = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateFormatter.format(date);

      console.log(formattedDate);
      return { formattedAmount, formattedDate, method };
    }
    return null; // Payment details or payment time not found
  } catch (err) {
    console.log("Error fetching payment details:", err);
    return null;
  }
};

module.exports = {
  renderCheckoutPage,
  createOrder,
  cardDetail,
  verify,
  success,
};
