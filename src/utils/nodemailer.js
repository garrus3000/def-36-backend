const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'anita98@ethereal.email',
        pass: 'HG9KhDKvRTtvFPK4wa'
    }
});

transporter.sendMail({
    from: 'TEST <anita98@ethereal.email>',
    to: 'anita98@ethereal.email',
    subject: 'un test de nodemailer',
    html: `<h1>HOla TeST <span style="color:blue;">en axul</span></h1>`,
  }).then((result) => {
    console.log(result);
  }).catch(console.log);