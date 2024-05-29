const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0 // 0 -> Normal user , 1-> Admin , 2-> sub-admin , 3-> editor
    }
}, { timestamps: true })


module.exports = mongoose.model('user', userSchema);