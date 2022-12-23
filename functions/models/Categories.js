const mongoose = require('mongoose');

const Categories = mongoose.model('Categories', {
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Categories;