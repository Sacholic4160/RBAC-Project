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


const getPermission = async (req, res) => {
    try {

        const Permission = await permission.find({});

        return res.status(200).json({
            success: true,
            msg: 'Permission Fetched Successfully!',
            data: Permission
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const deletePermission = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: "Errors",
                errors: errors.array(),
            });
        }

        const { id } = req.body

        const Permission = await permission.findByIdAndDelete({ _id: id })

        return res.status(200).json({
            success: true,
            msg: 'Permission delete successfully!'
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


const updatePermission = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: "Errors",
                errors: errors.array(),
            });
        }

        const { permission_name, id } = req.body

        const isExists = await permission.findOne({ _id: id })

        if (!(isExists)) {
            return res.status(200).json({
                success: false,
                msg: "Permission ID not exists"
            })
        }

        const isNameAssigned = await permission.findOne(
            {
                _id: { $ne: id },
                permission_name
            })

        if ((isNameAssigned)) {
            return res.status(400).json({
                success: false,
                msg: "Permission name already assigned to another permission"
            })
        }

        let updatePermission = {
            permission_name
        }

        if (req.body.default) {
            obj.is_default = parseInt(req.body.default);
        }
        const updatedPermission = await permission.findByIdAndUpdate({ _id: id }, { $set: updatePermission }, { new: true })

        return res.status(200).json({
            success: true,
            msg: 'Permission updated successfully!',
            data: updatedPermission
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


module.exports = { addPermission, getPermission, deletePermission, updatePermission }