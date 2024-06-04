const {validationResult} = require('express-validator')
const role = require('../../models/role.model.js')


const setRole = async (req,res) => {
    try {

        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: "Errors",
                errors: errors.array(),
            });
        }

        const { roleName , value } = req.body

        const roleData = new role({
            roleName,
            value
        })

        await roleData.save();
        
        return res.status(200).json({
            success: true,
            msg: 'role set successfully',
            data: roleData
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


const getRole = async (req,res) => {
    try {

        const roleData = await role.find({
            value: {
                $ne: 1  //admin data 
            }
        });

        if(!roleData){
            return res.status(400).json({
                success: false,
                msg:'role data does not exist'
            })  
        }

        return res.status(200).json({
            success: true,
            msg: 'role data fetched successfully',
            data: roleData
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })   
    }
}


module.exports = { setRole, getRole}