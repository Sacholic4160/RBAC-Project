const user = require('../models/user.model.js')
const permission = require('../models/permission.model.js')
const userpermission = require('../models/userPermission.model.js')
const { validationResult } = require('express-validator')
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../middleware/auth.middleware.js');
const { aggregate } = require('mongoose')
const {getUserPermissionsHelper} = require('../helpers/auth.helper.js')

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { name, email, password } = req.body;
        const isExistedUser = await user.findOne({ email });
        if (isExistedUser) {
            return res.status(200).json({
                success: false,
                msg: 'Email already existed'
            })
        }

        const hashedPassword = await bcrpyt.hash(password, 10);

        const User = new user({
            name,
            email,
            password: hashedPassword
        });
        const userData = await User.save();

        //assign default permissions 
        const defaultPermission = await permission.find({ is_default: 1 });

        const permissionArray = [];
        if (defaultPermission.length > 0) {
            defaultPermission.forEach(permission => {
                permissionArray.push({
                    permission_name: permission.permission_name,
                    permission_value: [0, 1, 2, 3]
                })
            })
        }

        const userPermissionData = new userpermission({
            user_id: userData._id,
            permission: permissionArray
        })
        await userPermissionData.save();

        return res.status(200).json({
            success: true,
            msg: 'User registered successfully!',
            data: userData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
            error: error
        });
    }
}

const generateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    return token;
}

const loginUser = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { email, password } = req.body;
        const userData = await user.findOne({
            email
        })

        if (!(userData)) {
            return res.status(400).json({
                success: false,
                msg: 'Email & Password is incorrect!'
            })
        }

        const isPasswordCorrect = await bcrpyt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.status(200).json({
                success: false,
                msg: 'Email & Password is incorrect!'
            })
        }

        const accessToken = await generateAccessToken({ user: userData })

        //get user data with all permissions
        const result = await user.aggregate([
            {
                $match: {
                    email: userData.email
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
                    email: 1,
                    name: 1,
                    role: 1,
                    permissions: {
                        $cond:{
                            if: { $isArray: "$permissions"},
                            then: { $arrayElemAt: [ "$permissions", 0 ]},//here we are returning the first element of array permissions
                            else: null
                        }
                    },
                    password: 1
                }
            },
            {
                $addFields:{
                    "permissions": {
                        "permissions":"$permissions.permissions"
                    }
                }
            }
        ])

        return res.status(200).json({
            success: true,
            msg: 'User logged in successfully!',
            accessToken: accessToken,
            tokenType: 'Bearer',
            data: result[0],
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {

         const user_id= req.user._id;
         const userData = await user.findOne({ _id: user_id})


        return res.status(200).json({
            success: true,
            msg: 'Profile Fetched Successfully!',
            data: userData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const getUserPermissions = async (req, res) => {
    try {
        const user_id = req.user._id;

       const userPermissions = await getUserPermissionsHelper(user_id);



        return res.status(200).json({
            success: true,
            msg: 'Profile Fetched Successfully!',
            data: userPermissions
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


module.exports = { registerUser, loginUser, getProfile , getUserPermissions}