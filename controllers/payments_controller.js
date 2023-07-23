// const Razorpay = require("razorpay");

// const razorpayInstance = new Razorpay({
//   key_id: "rzp_test_t5oFDruF5oObDd",
//   key_secret: "hUKKobvCPfMAva91M4gEAETA",
// });

// const createOrder = async (req, res, next) => {
//   try {
//     const amount = req.body.amount * 100;
//     const options = {
//       amount: 2000,
//       currency: "INR",
//       receipt: "razorUser@gmail.com",
//     };

//     razorpayInstance.orders.create(options, (err, order) => {
//       if (!err) {
//         res.status(200).send({
//           success: true,
//           msg: "Order Created",
//           order_id: order.id,
//           amount: amount,
//           key_id: RAZORPAY_ID_KEY,
//           product_name: req.body.name,
//           description: req.body.description,
//           contact: "8567345632",
//           name: "Uk",
//           email: "uk@gmail.com",
//         });
//       } else {
//         res.status(400).send({ success: false, msg: "Something went wrong!" });
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {
//   // renderProductPage,
//   createOrder,
// };
const User = require("../models/user");
const Razorpay = require("razorpay");

const renderCheckoutPage = async function (req, res) {
  try {
    console.log("HIII");
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
    const razorpayInstance = new Razorpay({
      key_id: "rzp_test_t5oFDruF5oObDd",
      key_secret: "hUKKobvCPfMAva91M4gEAETA",
    });
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

module.exports = { renderCheckoutPage, createOrder, cardDetail };
