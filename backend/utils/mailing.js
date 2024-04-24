var nodemailer = require("nodemailer");

  const sendEmail = async (options) =>{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth:{
        user: process.env.REAL_EMAIL_ID,
        pass: process.env.REAL_PASSWORD
      }
    })
  
  const  mailOption = {
    from : "Xf Organisation <noreply.organisation.xfintern>",
    to : options.email,
    subject : options.subject,
    html:`
    <div
      style="
        display: flex;
        justify-content: center;
        text-align: center;
        margin-bottom: 15px;
      "
    >
      <img
        src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713960788/job-logo/kqu80mfcjt35uyhgrals.png"
        alt="image-something"
        style="width:100%;"
      />
    </div>
    <div>
      Hello,
      <br />
      <br />
      ${options.message}
      <p>
        <a
          href="https://xfintern.onrender.com/"
          style="text-decoration: none; color: black; font-size: 0.85rem"
          >VISIT MY WEBSITE</a
        >
      </p>
      
      <p >
      Thanks
      <br />
        <a
          href="https://xfintern.onrender.com/"
          style="text-decoration: none; color: black; font-size: 0.90rem;letter-spacing: 0.015ch;"
          ><b>XF Intern (formerly Xf)</b></a
        >
      </p>
    </div>
    <div
    style="
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 5px;"
  >
    <img src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713337557/job-logo/knycmbmkqrcfzpx3r2au.png" 
    alt="logo" 
    style="width: 35%; text-align:center;"
    />
    </div>
    `
  //   attachments: [{
  //     filename: 'xfintern.png',
  //     path: '/',
  //     cid: 'xfinten@image.com' //same cid value as in the html img src
  // }]

  }

   await transporter.sendMail(mailOption,(error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = sendEmail;