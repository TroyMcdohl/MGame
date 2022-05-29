const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Troy<tharnyikaungset@gmail.com>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`./views/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOption = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOption);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to m-shop community.Happy Shopping!");
  }

  async sendResetPassword() {
    await this.send("forgotpassword", "Forgot passowr");
  }
};
