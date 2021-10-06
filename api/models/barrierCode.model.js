const  mongoose = require('mongoose')
const BarrierCodeSchema = new mongoose.Schema({
    used: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    usedAt: {
        type: Date
    },
    code: {
        type: String,
        required: true
    },
    customer: {
        email: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: String },
        reason: { type: String },
        required: false
    },
    origin: {
        type: String
    }
})
module.exports = mongoose.model('BarrierCode', BarrierCodeSchema)