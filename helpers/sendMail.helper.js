const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }

})

const sendMail = async (email, subject, content) => {

    try {
        var mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content

        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
            }
            console.log('Mail has been send', info.messageId)
        })


    } catch (error) {
        console.error(error.message)
    }

}
