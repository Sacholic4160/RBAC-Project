const mongoose = require('mongoose');
const user = require('./user.model.js');
const post = require('./post.model.js')

const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('like', likeSchema);