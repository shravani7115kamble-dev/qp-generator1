const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    module: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);