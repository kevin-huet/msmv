const nodemailer = require('nodemailer')

function sendMail(dest, subject, mail) {
    const smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_SECRET
        }
    })

    // Specify what the email will look like
    const mailOpts = {
        from: process.env.EMAIL_USER,
        to: dest,
        subject: subject,
        html: mail,
    }
    let valid = false
    // Attempt to send the email
    smtpTrans.sendMail(mailOpts).then(r => {
        valid = true
    }).catch(err => {
        valid = false
    })
    return valid
}

module.exports = { sendMail }
