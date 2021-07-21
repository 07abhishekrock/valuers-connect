const nodemailer = require("nodemailer");
const ejs = require("ejs");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Valuers Connect <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //   // Sendgrid
      //   // if(process.env.MAIL_SERVICE==="sendinblue"){
      //   return nodemailer.createTransport({
      //     service: 'SendinBlue',
      //     auth: {
      //       user: process.env.SENDINBLUE_USERNAME,
      //       pass: process.env.SENDINBLUE_PASSWORD
      //     }
      //   });
      // // }

      // Create the SMTP transport. USING AWS
      return nodemailer.createTransport({
        host: process.env.AWS_HOST,
        port: process.env.AWS_EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.AWS_USERNAME,
          pass: process.env.AWS_PASSWORD,
        },
      });
    } else if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2e608ecb1e8d94",
          pass: "216aef5e6cfa1f",
        },
      });
    }
    // return nodemailer.createTransport({
    //   host: smtp-relay.sendinblue.com,
    //   port: 587,
    //   auth: {
    //     user: env.SENDINBLUE_USERNAME,
    //     pass: env.SENDINBLUE_PASSWORD
    //   }
    // });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = await ejs.renderFile(
      `${__dirname}/../views/email/${template}.ejs`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    if(template === "contactform"){
      subject = "New Contact Form Submission - Valuers Connect"
    }
    else if(template === "newsletter"){
      subject = `NewsLetter ${subject.description}  - Valuers Connect`
    }

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    let data = await this.newTransport().sendMail(mailOptions);
    console.log("MAIL SENT>>>>>>>>>");
  }

  async sendEmailVerify() {
    await this.send("emailVerify", "Please Verify Your Email!");
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Valuers Connect Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};

// const nodemailer = require("nodemailer");

// //1) Create A Transporter
// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,

//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   //2) Define the EMail Option

//   const mailOption = {
//     from: "IndiCraft<indicraft@gmail.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   //3) Send the EMAIL
//   await transporter.sendMail(mailOption);
// };

// module.exports = sendEmail;
