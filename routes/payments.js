const express = require("express");
const router = express.Router();
console.log("Router loaded");

const paymentController = require("../controllers/payments_controller");

router.post("/checkout/:id", paymentController.renderCheckoutPage);
router.post("/create", paymentController.createOrder);
router.post("/card-detail", paymentController.cardDetail);

module.exports = router;
