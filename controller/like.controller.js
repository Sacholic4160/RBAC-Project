const { validationResult} = require('express-validator');

const user = require('../models/user.model.js')
const post = require('../models/post.model.js')
const like = require('../models/like.model.js')


const likePost = async(req,res) => {
    try {

      const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { user_id, post_id} = req.body

        const isLiked = await like.findOne({
            user_id,
            post_id
        })

        if(isLiked){
            return res.status(400).json({
                success: false,
                msg: 'you have already liked it'
            })
        }

        const Like = new like({
            user_id,
            post_id
        })

       const likeData =  await Like.save();

       return res.status(200).json({
        success: true,
        msg:'post liked',
        data:likeData
       })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })    
    }
}


const unLikePost = async(req,res) => {
    try {

      const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { user_id, post_id} = req.body

        const isLiked = await like.findOne({
            user_id,
            post_id
        })

        if(!isLiked){
            return res.status(400).json({
                success: false,
                msg: 'you have not liked the post'
            })
        }
        
       await like.deleteOne({
        user_id,
        post_id
       })

       return res.status(200).json({
        success: true,
        msg:'post unLiked',
       })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })    
    }
}


const postLikeCount = async( req,res) => {
    try {
       
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const {  post_id} = req.body

        const likeCount = await like.find({ post_id }).countDocuments();

        return res.status(200).json({
            status: true,
            msg:'count of like of a post got',
            data: likeCount
        })

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })   
    }
}

module.exports = { likePost, unLikePost, postLikeCount }