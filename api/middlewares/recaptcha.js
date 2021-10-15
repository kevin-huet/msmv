const fetch = require('isomorphic-fetch')
const handleSend = (req, res) => {
    const secret_key = process.env.CAPTCHA_SECRET
    const token = req.body.token
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`

    fetch(url, {
        method: 'post'
    })
        .then(response => response.json())
        .then(google_response =>
            {
                res.json(google_response)
                res.status(200)
            }
        )
        .catch(error => {
            res.json({ error })
            res.status(500)
        })
};
module.exports = handleSend