const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    roleName : {
     type: String,
     required: true
    },
    value: {
        type:Number,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('role',roleSchema);