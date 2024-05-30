const { validationResult } = require('express-validator')
const category = require('../models/category.model.js');


const addCategory = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { category_name } = req.body;

        const isCategoryExists = await category.findOne({
            name: {
                $regex: category_name,
                $options: 'i'
            }
        })
        if (isCategoryExists) {
            return res.status(200).json({
                success: false,
                msg: 'Category already exists',
            })
        }

        const Category = new category({
            name: category_name
        })
        const categoryData = await Category.save();

        return res.status(200).json({
            success: true,
            msg: 'Category Added Successfully',
            data: categoryData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


const getCategories = async (req, res) => {
    try {

        const Categories = await category.find({});


        return res.status(200).json({
            success: true,
            msg: 'Categories Fetched Successfully',
            data: Categories
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


const updateCategory = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { category_name, id } = req.body;

        const isExists = category.findOne({
            _id: id
        })
        if (!(isExists)) {
            return res.status(200).json({
                success: false,
                msg: 'Category to be update does not exists',
            })
        }

        const isNameExists = await category.findOne({
            _id: { $ne: id },
            name: {
                $regex: category_name,
                $options: 'i'
            }
        })
        if (isNameExists) {
            return res.status(200).json({
                success: false,
                msg: 'Category Name already assigned to different id!',
            })
        }

        const updatedCategory = await category.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    name: category_name
                }
            },

            { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Category Updated Successfully',
            data: updatedCategory
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


const deleteCategory = async (req, res) => {
    try {


        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { id } = req.body

        const Category = await category.findOne({ _id: id })

        if (!(Category)) {
            return res.status(200).json({
                success: false,
                msg: 'Category with given id does not exist!'
            })
        }

        await category.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            msg: 'Category deleted successfully!'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


module.exports = { addCategory, getCategories, updateCategory, deleteCategory }