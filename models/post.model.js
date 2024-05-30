const mongoose = require('mongoose');
const category = require('./category.model.js')
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: false
    }]
}, { timestamps: true })


module.exports = mongoose.model('post', postSchema);