const  mongoose = require('mongoose')
const PromoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('PromoCode', PromoCodeSchema)