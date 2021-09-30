let express = require('express')
let router = express.Router()
let User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

/* GET home page. */
router.post('/login', async function(req, res, next) {
    const { email, password } = req.body

    let foundUser = await User.findOne( { email } )
    const validPassword = await bcrypt.compare(password, foundUser.password);

    if (validPassword) {
        const token = genToken(foundUser)
        res.cookie('session', token, { httpOnly: true })
        res.status(200)
    } else
        res.status(401)
});

router.post('/register', async function (req, res, next) {
    const { first_name, last_name, email, password } = req.body

    //Check If User Exists
    let foundUser = await User.findOne({ email })
    if (foundUser) {
        return res.status(403).json({ error: 'Email is already in use'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ firstName: first_name, lastName: last_name, email: email, password: hashPassword })
    await newUser.save()
    const token = genToken(newUser)
    res.status(200).json({ token })
});

genToken = user => {
    return jwt.sign({
        iss: process.env.ISS,
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWT_SECRET)
}

module.exports = router