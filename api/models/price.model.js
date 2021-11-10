const  mongoose = require('mongoose')
const PriceSchema = new mongoose.Schema({
    plan: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('Prices', PriceSchema)