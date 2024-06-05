const mongoose = require('mongoose');

const routerPermissionSchema = new mongoose.Schema({
    router_endpoint : {
        type: String,
        required: true
    },
    role: {
        type: Number,
        //default: 0  // 0 -> Normal user , 1-> Admin , 2-> sub-admin , 3-> editor
        required:true
    },
    permission:{
        type:Array, //0,1,2,3
        required:true
    }


}, { timestamps: true })


module.exports = mongoose.model('routerPermission', routerPermissionSchema);