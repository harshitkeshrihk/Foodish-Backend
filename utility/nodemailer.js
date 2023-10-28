const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str,data){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "harshitkeshrihk@gmail.com",
          pass: "ykdj ggrz nhtq grqf",
        },
      });

      var Osubject,Otext,Ohtml;
      if(str=="signup"){
        Osubject=`Thank you for signing ${data.name}`;
        Ohtml=`
        <h1>Welcome to foodApp.com</h1>
        Hope you have a good time !
        Here are your details-
        Name - ${data.name}
        Email - ${data.email}
        `
      }else if(str=="resetpassword"){
        Osubject=`Reset Password`;
        Ohtml=`
        <h1>foodApp.com</h1>
        Here is your link to reset your password !
        ${data.resetPasswordLink}
        `
      }

      const info = await transporter.sendMail({
        from: '"Food App 👻" <harshitkeshrihk@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: Osubject, // Subject line
        html: Ohtml, // html body
      });
      console.log("Message sent: %s", info.messageId);
};
