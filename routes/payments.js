const express = require("express");
const router = express.Router();
const passport = require("passport");

console.log("Router loaded");

const paymentController = require("../controllers/payments_controller");

router.post(
  "/checkout/:id",
  passport.checkAuthentication,
  paymentController.renderCheckoutPage
);
router.post(
  "/create",
  passport.checkAuthentication,
  paymentController.createOrder
);
router.post("/card-detail", paymentController.cardDetail);
router.post("/verify", paymentController.verify);
router.post("/success", paymentController.success);
module.exports = router;
