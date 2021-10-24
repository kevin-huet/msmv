let express = require('express')
let router = express.Router()
let Booking = require('../models/booking.model')
let Prices = require('../models/price.model')
let passport = require('passport')
/* GET home page. */
router.get('/all', passport.authenticate('jwt',{session: false}), async (req, res, next) => {
    const bookings = await Booking.find({})
    res.status(200).json({
        bookings : bookings
    })
})

router.put('/update-status', passport.authenticate('jwt',{session: false}, null), async (req, res) => {
    const { id, status } = req.body
    console.log(id)
    await Booking.findOneAndUpdate({ _id: id }, { status: status })
    res.status(200).json({})
})

router.delete('/delete', passport.authenticate('jwt',{session: false}, null), async (req, res) => {
    const data = req.body
    await Booking.findOneAndRemove({ _id: data.id })
    res.status(200).json({})
})

router.get('/prices/all', passport.authenticate('jwt',{session: false}, null), async (req, res) => {
    res.status(200).json({
        prices: {
            child: 25,
            young: 50,
            adult: 120
        }
    })
})

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

async function createPlan(category, title, price) {
    let prices = new Prices({
        plan: title,
        category: category,
        price: price
    })
    await prices.save()
}

module.exports = router;
