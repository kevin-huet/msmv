const express = require('express')
const router = express.Router()
const PromoCode = require('../models/promoCode.model')

/**
 * @swagger
 * /code/promo/all:
 *    get:
 *      tags:
 *      - promo code
 *      description: get all promo codes
 *      responses:
 *        '200':
 *          description: get all promo codes
 */
router.get('/promo/all', async(req, res, next) => {
    const promoCodes = await PromoCode.find({})

    res.status(200).json({ promoCodes: promoCodes })
})

/**
 * @swagger
 * /code/promo/add:
 *    post:
 *      tags:
 *      - promo code
 *      description: add new promo code
 *      parameters:
 *      - name: code
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: reduce
 *        in: body
 *        required: true
 *        schema:
 *          type: number
 *      - name: expiration
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: save promo code and return it
 */
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

/**
 * @swagger
 * /code/promo/delete:
 *    delete:
 *      tags:
 *      - promo code
 *      parameters:
 *      - name: id
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      description: delete promo code
 *      responses:
 *        '200':
 *          description: delete promo code
 */
router.delete('/promo/delete', async (req, res) => {
    const data = req.body
    await PromoCode.findOneAndRemove({ _id: data.id })
    res.status(200).json({})
})

/**
 * @swagger
 * /code/promo/edit:
 *    post:
 *      tags:
 *      - promo code
 *      parameters:
 *      - name: actual code
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: code
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: amount
 *        in: body
 *        required: true
 *        schema:
 *          type: number
 *      - name: expiration
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      description: edit promo code
 *      responses:
 *        '200':
 *          description: edit promo code and return it
 */
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
