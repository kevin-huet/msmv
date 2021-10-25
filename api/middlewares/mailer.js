const nodemailer = require('nodemailer')

const smtp = (process.env.MAILER_TYPE === 'SMTP') ? {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER,
    }
} : undefined

const emailOnly = (process.env.MAILER_TYPE === 'EMAIL') ? {
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER
    }
} : undefined

function sendMail(dest, subject, mail) {
    const smtpTrans = nodemailer.createTransport((smtp !== undefined) ? smtp : emailOnly)

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
