const mongoose = require('mongoose');

const Home = mongoose.model('home', {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: [String],
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: new Date().toString()
    }
})

module.exports = Home;