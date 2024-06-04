const mongoose = require('mongoose');
const user = require('./user.model.js');

const userPermissionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    permission: [{
        permission_name: String,
        permission_value: [Number] // 0 -> create , 1 -> edit , 2 -> read , 3 -> delete
    }]
}, { timestamps: true })


module.exports = mongoose.model('userPermission', userPermissionSchema);