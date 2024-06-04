const post = require('../models/post.model.js')
const User = require('../models/user.model.js')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')


const createPost = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { title, description } = req.body

        const obj = {
            title,
            description
        }

        if (req.body.categories) {
            obj.categories = req.body.categories
        }

        const Post = new post(obj) //this is to just save the data 
       const postData = await Post.save();
       // console.log(Post)

        const fullPostData = await post.findOne({ _id: postData._id }).populate('categories').select(" -__v -createdAt -updatedAt ")
        

        return res.status(200).json({
            success: true,
            msg: 'Post created Successfully',
            data: fullPostData
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

}

const getPosts = async (req, res) => {
    try {

        const postData = await post.find({}).populate('categories')
        if (!postData) {
            return res.status(404).json({
                success: false,
                msg: 'post not found'
            })
        }

        return res.status(200).json({
            success: true,
            msg: 'post fetched successfully',
            data: postData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


const updatePost = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }
        const { id, title ,description } = req.body;

        const isExist = await post.findById({ _id : id})

        if(!isExist){
            return res.status(404).json({
                success: false,
                msg:'post not found with this id'
            })


        }

        const updateObj = {
            title,
            description
        }

        if(req.body.categories){
            updateObj.categories = req.body.categories
        }

        const updatedData = await post.findByIdAndUpdate({_id:id},
            {
                $set:updateObj
            },
            {new :true}
        ).populate('categories')
        
        return res.status(200).json({
            success: true,
            msg: 'post updated successfully',
            data: updatedData
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const deletePost = async (req, res) => {
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

        const isExist = await post.findById({ _id : id})

        if(!isExist){
            return res.status(404).json({
                success: false,
                msg:'post not found with this id'
            })
        }

        await post.findByIdAndDelete({_id:id})
        
        return res.status(200).json({
            success: true,
            msg: 'post deleted successfully'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = { createPost, getPosts, updatePost, deletePost }  