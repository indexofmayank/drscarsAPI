const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true,
    },

    startTime: {
        type: String,
        required: true,
    },

    endDate: {
        type: String,
        required: true,
    },

    endTime: {
        type: String,
        required: true
    },

    pricePerDay: {
        type: String,
        default: "fake-price"
    },

    totalPrice: {
        type: String,
        default: "fake-price"
    },

    altEmail: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Booking', bookingSchema);