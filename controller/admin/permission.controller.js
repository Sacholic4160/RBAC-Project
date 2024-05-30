const { validationResult } = require('express-validator')
const permission = require('../../models/permission.model.js')

const addPermission = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: "Errors",
                errors: errors.array(),
            });
        }

        const { permission_name } = req.body

        const isExists = await permission.findOne({ permission_name })

        if (isExists) {
            return res.status(200).json({
                success: false,
                msg: "Permission Name already exists"
            })
        }

        let obj = {
            permission_name
        }

        if (req.body.default) {
            obj.is_default = parseInt(req.body.default);
        }

        const Permission = new permission(obj);
        const newPermission = await Permission.save();

        return res.status(200).json({
            success: true,
            msg: 'Permission added successfully!',
            data: newPermission
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = { addPermission }