const Post = require('../models/post.model.js')
const User = require('../models/user.model.js')
const { validationResult } = require('express-validator')


const createPost = async (req ,res) => {

    const errors = validationResult(req);

    if(!(errors.isEmpty())){
        return res.status(200).json({
            success: false,
            msg:'Errors',
            error:errors.array()
        })
    }

    const {title,description } = req.body

    const obj = {
        title,
        description
        }

     if(req.body.category){
        obj.category = req.body.category
   0  }
      

}



module.exports = { createPost ,}