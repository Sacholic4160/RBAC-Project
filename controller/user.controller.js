const { validationResult } = require("express-validator")

const user = require('../models/user.model.js')
const randomString = require('randomstring');
const bcrypt = require('bcrypt');
const mailer = require('../helpers/sendMail.helper.js');


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

        mailer(userData.email, 'user created', content )

        return res.status(200).json({
            success: true,
            msg: 'user created successfully',
            data: userData
        })



    } catch (error) {

        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const getUsers = async( req, res) => {
    try {
        
        const users = await user.find({
            _id:{
                $ne:req.user._id
            }
        })

        return res.status(200).json({
            success: true,
            msg:'users fetched successfully',
            data: users
        })
    } catch (error) {
      
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const updateUser = async(req,res) => {
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

        if(req.body.role && req.body.role==1){
            return res.status(400).json({
                success: false,
                msg: 'you are not authorized to create admin',
            })
        }
        else{
            updateObj.role = req.body.role
        }

const updatedData = await user.findByIdAndUpdate({_id:id},
    {$set: updateObj},
    {new: true}

)

return res.status(200).json({
    success: true,
    msg:'user updated successfully',
    data: updatedData
})


    } catch (error) {
      return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const deleteUser = async (req,res) => {
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

        await user.findByIdAndDelete({_id: id})
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