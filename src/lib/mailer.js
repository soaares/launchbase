const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f0a3a939a37723",
      pass: "9b26bf1cc2e3ac"
    }
  });