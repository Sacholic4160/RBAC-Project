const mongoose = require('mongoose');
const user = require('./user.model.js');
const post = require('./post.model.js')

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('comment', commentSchema);