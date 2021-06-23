var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMailNotification = (change) => {
    const mailOptions = {
        from: 'maoragai12@gmail.com',
        to: 'maoragai12@gmail.com',
        subject: 'The Black Widows pre-order has opened!',
        text: `The Black Widows pre-order has opened! - Link for order: https://www.cinema-city.co.il/movie/2989 \n\n ${change}`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = {sendMailNotification};