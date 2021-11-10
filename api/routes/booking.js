let express = require('express')
let router = express.Router()
let Booking = require('../models/booking.model')
let Prices = require('../models/price.model')
let passport = require('passport')

/**
 * @swagger
 * /bookings/update-status:
 *    put:
 *      tags:
 *      - bookings
 *      description: change booking status
 *      parameters:
 *      - name: id
 *        in: body
 *        description: id of a booking
 *        required: true
 *        schema:
 *          type: string
 *      - name: status
 *        in: body
 *        description: status of booking
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Successfully change status
 */
router.put('/update-status', passport.authenticate('jwt',{session: false}, null), async (req, res) => {
    const { id, status } = req.body
    console.log(id)
    await Booking.findOneAndUpdate({ _id: id }, { status: status })
    res.status(200).json({})
})

/**
 * @swagger
 * /bookings/delete:
 *    delete:
 *      tags:
 *      - bookings
 *      description: Returns all users
 *      parameters:
 *      - name: id
 *        in: body
 *        description: Firstname of the user
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Successfully delete booking
 */
router.delete('/delete', passport.authenticate('jwt',{session: false}, null), async (req, res) => {
    const data = req.body
    await Booking.findOneAndRemove({ _id: data.id })
    res.status(200).json({})
})


/**
 * @swagger
 * /bookings/all:
 *    get:
 *      tags:
 *      - bookings
 *      description: Returns all users
 *      responses:
 *        '200':
 *          description: Successfully returned all bookings
 */
router.get('/all', passport.authenticate('jwt',{session: false}), async (req, res, next) => {
    const bookings = await Booking.find({})
    res.status(200).json({
        bookings : bookings
    })
})

/**
 * @swagger
 * /bookings/prices/standard:
 *    get:
 *      tags:
 *      - prices
 *      description: Returns all standard prices
 *      responses:
 *        '200':
 *          description: Successfully get all standard prices
 */
router.get('/prices/standard', async (req, res) => {
    const child = await Prices.findOne({ plan: 'Enfant', category: 'standard' })
    const young = await Prices.findOne({ plan: 'Jeune', category: 'standard' })
    const adult = await Prices.findOne({ plan: 'Adulte', category: 'standard' })
    res.status(200).json({
        prices: {
            child: child,
            young: young,
            adult: adult
        }
    })
})


/**
 * @swagger
 * /bookings/prices/standard/set:
 *    post:
 *      tags:
 *      - prices
 *      description: set all standard prices
 *      parameters:
 *      - name: child
 *        in: body
 *        description: child plan price
 *        required: true
 *        schema:
 *          type: number
 *      - name: young
 *        in: body
 *        description: young plan price
 *        required: true
 *        schema:
 *          type: number
 *      - name: young
 *        in: body
 *        description: adult plan price
 *        required: true
 *        schema:
 *          type: number
 *      responses:
 *        '200':
 *          description: Successfully set all standard prices
 */
router.post('/prices/standard/set', async (req, res) => {
    const { child, young, adult } = req.body
    let test = [child, young, adult]
    let title = ['Enfant', 'Jeune', 'Adulte']
    let test2 = [
        await Prices.findOne({ plan: 'Enfant', category: 'standard' }),
        await Prices.findOne({ plan: 'Jeune', category: 'standard' }),
        await Prices.findOne({ plan: 'Adulte', category: 'standard' })
    ]

    for (let i = 0; i !== 3; i++) {
        if (test2[i] == null) {
            await createPlan('standard', title[i], test[i])
        } else {
            test2[i].price = test[i]
            test2[i].save()
        }
    }
    res.status(200).json({
        prices: { child: child, young: young, adult: adult }
    })
})

/**
 * @swagger
 * /bookings/add:
 *    post:
 *      tags:
 *      - bookings
 *      description: add new booking
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
 *      - name: phone
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: visitDate
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: comment
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: plans
 *        in: body
 *        required: true
 *        schema:
 *          type: Object
 *      - name: vehicles
 *        in: body
 *        required: true
 *        schema:
 *          type: number
 *      responses:
 *        '200':
 *          description: Successfully add booking
 */
router.post('/add', passport.authenticate('jwt',{session: false}), async (req, res) => {
    const { firstname, lastname, email, phone, visitDate, comment, plans, vehicles } = req.body
    const child = await Prices.findOne({ plan: 'Enfant', category: 'standard' })
    const young = await Prices.findOne({ plan: 'Jeune', category: 'standard' })
    const adult = await Prices.findOne({ plan: 'Adulte', category: 'standard' })
    const price = (child.price * plans.standard.child) + (young.price * plans.standard.young) + (adult.price * plans.standard.adult)

    const booking = new Booking({
        firstname: firstname, lastname: lastname, email: email,
        phone: phone, visitDate: Date.parse(visitDate),
        price: price, plans: plans, comment: comment,
        vehicles: vehicles
    })

    await booking.save()
    res.status(200).json({
        booking: booking
    })
})

async function createPlan(category, title, price) {
    let prices = new Prices({
        plan: title,
        category: category,
        price: price
    })
    await prices.save()
}

module.exports = router;
