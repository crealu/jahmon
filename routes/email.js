const nodemailer = require('nodemailer');
const mailer = require('../config/keys').EmailCredentials;

module.exports = {
  handlePasswordReset: function(userEmail) {
    const contents = `
      <h3>Password Reset Link</h3>
      <p>Use the link below to reset your password</p>
    `;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: mailer.e, pass: mailer.p },
      tls: { rejectUnauthorized: false }
    });

    let mailOptions = {
      from: 'Niheigo Support <niheigodev@site.com>',
      to: userEmail,
      subject: 'Password Reset',
      text: "text",
      html: contents
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) { return console.log(err) }
      console.log(info);
    });
    return 0;
  },
  handleNewUser: function(userEmail) {
    const contents = `<h3>New Rgistered User: ${userEmail}</h3>`;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: mailer.e, pass: mailer.p },
      tls: { rejectUnauthorized: false }
    });

    let mailOptions = {
      from: 'Niheigo Support <niheigodev@site.com>',
      to: 'niheigodev@gmail.com',
      subject: 'New Niheigo User',
      text: "text",
      html: contents
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) { return console.log(err) }
      console.log(info);
    });
    return 0;
  }
}
