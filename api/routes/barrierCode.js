const express = require('express');
const router = express.Router();
const passport = require('passport')
const BarrierCode = require('../models/barrierCode.model')

router.get('/barrier/all', passport.authenticate('jwt',{session: false}), async (req, res, next) => {
    const barrierCodes = await BarrierCode.find({})

    console.log(barrierCodes)
    res.status(200).json({ barrierCodes: barrierCodes })
})

router.get('/barrier/available', async (req, res) => {
    const barrierCode = await  BarrierCode.findOne({ used: false })

    if (!barrierCode) {
        return res.status(400).json({})
    }
    res.status(200).json({})
})

router.post('/barrier/add', passport.authenticate('jwt',{session: false}, null), async (req, res, next) => {
    const { code } = req.body
    const existCode = await BarrierCode.findOne({ code: code })

    if (existCode) {
        return res.status(400).json({})
    }
    const barrierCode = new BarrierCode({ code }).save()
    res.status(200).json({ code: barrierCode })
})

router.post('/barrier/edit', passport.authenticate('jwt',{session: false}, null), async (req, res, next) => {
    res.status(200).json({})
})

router.post('/barrier/send/private', passport.authenticate('jwt',{session: false}, null), async (req, res) => {
    const {} = req.body

    res.status(200).json({})
})

router.post('/barrier/send/public', async (req, res) => {
    const { email, lastName, firstName, phone, reason } = req.body
    const barrierCode = await BarrierCode.findOne({ 'used': false })

    if (!barrierCode) {
        return res.status(400).json({})
    }
    barrierCode.used = true
    barrierCode.origin = 'public'
    barrierCode.customer = { email, firstName, lastName, phone, reason }
    res.status(200).json({})
})

router.get('/barrier/client', async (req, res) => {
    const { email } = req.body
    const barrierCode = BarrierCode.findOne({ 'customer.email': email })

    res.status(200).json({ customer: ((barrierCode) ? barrierCode.customer : null) })
})

router.post('/barrier/use-barrier-code', async (req, res) => {
    const { email, lastName, firstName, reason } = req.body
    const code = await BarrierCode.findOne({ used: false })

    if (!code || !email) {
        return res.status(400).json({})
    }
    code.used = true
    code.customer = {
        email: email,
        firstname: firstName,
        lastname: lastName,
        reason: reason,
        phone: null
    }
    await code.save()
    // send mail function
    res.status(200).json({ code })
})

router.delete('/barrier/delete', passport.authenticate('jwt',{session: false}, null), async (req, res, next) => {
    res.status(200).json({})
})

module.exports = router;