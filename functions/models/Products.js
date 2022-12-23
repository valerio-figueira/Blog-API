const mongoose = require('mongoose');

const Product = mongoose.model('Products', {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Product;