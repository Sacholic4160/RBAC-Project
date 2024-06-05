const { validationResult } = require("express-validator")
const mongoose = require('mongoose')
const user = require('../models/user.model.js')
const randomString = require('randomstring');
const bcrypt = require('bcrypt');
const mailer = require('../helpers/sendMail.helper.js');
const permission = require('../models/permission.model.js')
const userpermission = require('../models/userPermission.model.js')


const createUser = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { email, name } = req.body;

        const isExist = await user.findOne({
            email
        })

        if (isExist) {
            return res.status(400).json({
                success: false,
                msg: 'user with this email already exist',
            })
        }

        const password = randomString.generate(6);
        const hashedPassword = await bcrypt.hash(password, 10);


        const obj = {
            name,
            email,
            password: hashedPassword
        }

        if (req.body.role && req.body.role == 1) {
            return res.status(400).json({
                success: false,
                msg: 'you cannot create admin',
            })
        }
        else {
            obj.role = req.body.role
        }

        const User = new user(obj)
        const userData = await User.save();

        //add permission to user if coming in request
        if (req.body.permissions != undefined && req.body.permissions.length > 0) {

            const addPermission = req.body.permissions;
            const permissionArray = [];

            await Promise.all(addPermission.map(async (Permission) => {
                const permissionData = await permission.findOne({ _id: Permission.id });

                permissionArray.push({
                    permission_name: permissionData.permission_name,
                    permission_value: Permission.value,
                })
            }));

            const userpermissionData = new userpermission({
                user_id: userData._id,
                permission: permissionArray
            })
            await userpermissionData.save();

        }

        const content = `
        <p>Hii <b> ${userData.name}, <b> Your account is created, below is your details.<p>
        <table style='border-style:none;'>
        <tr>
        <th> Name:- </th>
        <td> ${userData.name} </td>
        </tr>
        <tr>
        <th> Email:- </th>
        <td> ${userData.email} </td>
        </tr>
        <tr>
        <th> Password:- </th>
        <td> ${userData.password} </td>
        </tr>
</table>
 <p>Now you can login you accound </p>
        `

        //  mailer(userData.email, 'user created', content)

        return res.status(200).json({
            success: true,
            msg: 'user created successfully',
            data: userData,
            //  permissions:userpermissionData
        })



    } catch (error) {

        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {

        //get user data with all permissions
        const result = await user.aggregate([
            {
                $match: {
                    _id: {
                        $ne: new mongoose.Types.ObjectId(req.user._id) // in aggregation we have to convert it to objectId to access!!
                    }
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
                        $cond: {
                            if: { $isArray: "$permissions" },
                            then: { $arrayElemAt: ["$permissions", 0] },//here we are returning the first element of array permissions
                            else: null
                        }
                    },
                    password: 1
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

        return res.status(200).json({
            success: true,
            msg: 'users fetched successfully',
            data: result
        })
    } catch (error) {

        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { id, name } = req.body;

        const isExist = await user.findOne({
            _id: id
        })

        if (!isExist) {
            return res.status(400).json({
                success: false,
                msg: 'user with this id does not exist',
            })
        }

        let updateObj = {
            name
        }

        if (req.body.role && req.body.role == 1) {
            return res.status(400).json({
                success: false,
                msg: 'you are not authorized to create admin',
            })
        }
        else {
            updateObj.role = req.body.role
        }

        const updatedData = await user.findByIdAndUpdate({ _id: id },
            { $set: updateObj },
            { new: true }

        )

        return res.status(200).json({
            success: true,
            msg: 'user updated successfully',
            data: updatedData
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {


        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { id } = req.body;

        const isExist = await user.findOne({
            _id: id
        })

        if (!isExist) {
            return res.status(400).json({
                success: false,
                msg: 'user with this id does not exist to delete',
            })
        }

        await user.findByIdAndDelete({ _id: id })
        return res.status(200).json({
            success: true,
            msg: 'user deleted successfully'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = { createUser, getUsers, updateUser, deleteUser }