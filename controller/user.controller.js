const { validationResult } = require("express-validator")

const user = require('../models/user.model.js')
const randomString = require('randomstring');
const bcrypt = require('bcrypt');
const mailer = require('../helpers/sendMail.helper.js');
const { use } = require("../router/common.route.js");

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


module.exports = { createUser, }