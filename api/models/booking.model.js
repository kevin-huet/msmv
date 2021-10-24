const  mongoose = require('mongoose')
const BookingSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    phone: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    price: {
        type: Number
    },
    vehicles: {
        type: Number,
        default: 0
    },
    plans: {
        standard: {
            child: {
                type: Number
            },
            young: {
                type: Number
            },
            adult: {
                type: Number
            }
        }
    },
    status: {
        type: String,
        default: 'En attente'
    }
})
module.exports = mongoose.model('Booking', BookingSchema)
