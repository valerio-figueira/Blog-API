const mongoose = require('mongoose');

const Popular = mongoose.model('popular', {
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

module.exports = Popular;