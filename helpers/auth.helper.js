const user = require('../models/user.model.js')
const mongoose = require('mongoose')

const getUserPermissionsHelper = async (user_id) =>{
    try {
        
        //get user data with all permissions
        const User = await user.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(user_id) // in aggregation we have to convert it to objectId to access!!
                }
            },
            {
                $lookup: {
                    from: "userpermissions",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "permissions"
                }
            },
            {
                $project: {
                    _id: 1, //here we can only set the value of id to zero(0) and not others ,, if we do this it will throw error so either dont write  it or we wrote it then set it to 1
                    role: 1,
                    permissions: {
                        $cond: {
                            if: { $isArray: "$permissions" },
                            then: { $arrayElemAt: ["$permissions", 0] },//here we are returning the first element of array permissions
                            else: null
                        }
                    },
                   
                }
            },
            {
                $addFields: {
                    "permissions": {
                        "permissions": "$permissions.permissions"
                    }
                }
            }
        ])

        return User[0];
    } catch (error) {
      return res.status(400).json({
        status:false,
        msg:error.message
      })  
    }
}


module.exports = { getUserPermissionsHelper }