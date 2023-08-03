const nodeMailer = require("../config/nodemailer");
const user = require("../models/user");

// this is another way of exporting a method
exports.newReceipt = (user) => {
  console.log("inside newReceipt mailer");
  console.log("user->", user);

  nodeMailer.transporter.sendMail(
    {
      from: '"Gliadalista Consulting" <coder.utsav64@gmail.com>',
      to: user.email,
      subject: "Payment Successful",
      html: "<h1>Congratulations your payment is successfull!</h1> ",
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
