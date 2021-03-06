const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const rateLimit = require("express-rate-limit")
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10,
})

/**
 * @swagger
 * /auth/login:
 *    post:
 *      tags:
 *      - auth
 *      description: login, return jwt and user info (email and id)
 *      parameters:
 *      - name: email
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: success
 */
router.post('/login', apiLimiter, async function(req, res, next) {
    const { email, password } = req.body
    let foundUser = await User.findOne( { email } )

    if (foundUser) {
        const validPassword = await bcrypt.compare(password, foundUser.password);

        if (validPassword && foundUser.role === 'ROLE_ADMIN') {
            const token = genToken(foundUser)
            res.cookie('session', token, {httpOnly: true})
            res.status(200).json({ token: token,
                user: {
                    id: foundUser._id,
                    email: foundUser.email
                }
            })
        } else
            res.status(401).json({})
    } else {
        res.status(401).json({})
    }
})

/**
 * @swagger
 * /auth/register:
 *    post:
 *      tags:
 *      - auth
 *      description: login, return jwt and user info (email and id)
 *      parameters:
 *      - name: firstname
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: lastname
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: email
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Successfully delete booking
 */
router.post('/register', async function (req, res, next) {
    const { first_name, last_name, email, password } = req.body

    //Check If User Exists
    const foundUser = await User.findOne({ email })
    if (foundUser) {
        return res.status(403).json({ error: 'Email is already in use'})
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ firstname: first_name, lastname: last_name, email: email, password: hashPassword })
    await newUser.save()
    const token = genToken(newUser)
    res.status(200).json({ token })
})

/**
 * @swagger
 * /auth/create-user:
 *    post:
 *      tags:
 *      - auth
 *      description: create new user
 *      parameters:
 *      - name: firstname
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: lastname
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: email
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: role
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Successfully create user
 */
router.post('/create-user', passport.authenticate('jwt',{session: false}), async function (req, res, next) {
    const { firstname, lastname, email, password, role } = req.body

    //Check If User Exists
    const foundUser = await User.findOne({ email })
    if (foundUser) {
        return res.status(403).json({ error: 'Email is already in use'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ firstname: firstname, lastname: lastname, email: email, password: hashPassword, role: role })
    await newUser.save()
    res.status(200).json({ user: newUser })
})

genToken = user => {
    return jwt.sign({
        iss: process.env.ISS,
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWT_SECRET)
}

module.exports = router
