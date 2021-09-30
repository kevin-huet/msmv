const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status')

module.exports = function (req, res, user) {
    if (user !== null) {
        req.status = 200
        req.body = {
            token: jwt.sign(
                {
                    "email": user.email,
                    "username": user.username,
                    "expiration": "1d"
                },
                "test",
            ), // Should be the same secret key as the one used is ./jwt.ts
            message: 'Successfully logged in!'
        }
        req.cookies.set('jwt', req.body.token, {
            httpOnly: true,
            secure: false //--> SET TO TRUE ON PRODUCTION
        })
    } else {
        req.status = HttpStatus.UNAUTHORIZED
        req.body = {
            message: 'Authentication failed'
        }
    }
    return req
}