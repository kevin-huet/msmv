const express = require('express')
const router = express.Router()
const PromoCode = require('../models/promoCode.model')

/* GET home page. */
router.get('/promo/all', async(req, res, next) => {
    const promoCodes = await PromoCode.find({})

    res.status(200).json({ promoCodes: promoCodes })
})

router.post('/promo/add', async (req, res) => {
    const { code, reduce, expiration } = req.body
    const existCode = await PromoCode.findOne({ code: code })

    if (existCode) {
        return res.status(400).json({})
    }
    const promoCode = new PromoCode({
        code: code, amount: reduce, expiration: Date.parse(expiration)
    })
    await promoCode.save()
    res.status(200).json({ promoCode: promoCode })
})

router.delete('/promo/delete', async (req, res) => {
    const data = req.body
    await PromoCode.findOneAndRemove({ _id: data.id })
    res.status(200).json({})
})

router.post('/promo/edit', async (req, res) => {
    const { actualCode, code, amount, expiration } = req.body
    const existCode = PromoCode.findOneAndUpdate({ code: actualCode }, {
        code: code, amount: amount, expiration: expiration
    }).then().catch(err => {
        res.status(400).json({ err })
    })

    res.status(200).json({ promoCode: existCode })
})

module.exports = router;