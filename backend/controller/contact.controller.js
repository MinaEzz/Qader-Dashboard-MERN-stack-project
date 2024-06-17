const nodemailer = require("nodemailer");
const { FAIL, SUCCESS, ERROR } = require("../utils/httpStatusText");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.QADER_GMAIL,
    pass: process.env.QADER_APP_PASSWORD,
  },
});

const sendContactEmail = async (req, res, next) => {
  const body = req.body;
  const mailOptions = {
    from: `"${body.firstName} ${body.lastName}" <${body.email}>`,
    to: process.env.QADER_GMAIL,
    subject: "New Contact Form Submission",
    html: `
          <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Message:</strong> ${body.message}</p>
        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      const error = new Error("Failed To Send Mail !");
      error.status = FAIL;
      error.code = 400;
      return next(error);
    }
    res.status(200).json({
      status: SUCCESS,
      data: { info },
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

module.exports = sendContactEmail;
