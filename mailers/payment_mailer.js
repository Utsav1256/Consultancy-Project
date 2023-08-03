const nodemailer = require("../config/nodemailer");
const nodeMailer = require("../config/nodemailer");
const user = require("../models/user");

// this is another way of exporting a method
exports.newReceipt = (
  user,
  payment_amount,
  payment_id,
  payment_time,
  payment_method
) => {
  console.log("inside newReceipt mailer");
  // console.log("req->", req);

  console.log("payment_id->", payment_id);
  // console.log("payment->", payment);
  console.log("paymentTime->", payment_time);

  let htmlString = nodemailer.renderTemplate(
    {
      user: user,
      payment_amount: payment_amount,
      payment_id: payment_id,
      payment_time: payment_time,
      payment_method: payment_method,
    },
    "/payments/new_payment.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: '"Gliadalista Consulting" <coder.utsav64@gmail.com>',
      to: user.email,
      subject: "Payment Successful",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};
