const express = require('express')

const router = express.Router();
const verifyJWT = require('../middleware/auth.middleware.js');
const onlyAdminAccess = require('../middleware/admin.middleware.js');
const { createPost, getPosts, updatePost , deletePost } = require('../controller/post.controller.js');
const { categoryAddValidator, categoryUpdateValidator, categoryDeleteValidator, postCreateValidator, postUpdateValidator, postDeleteValidator } = require('../helpers/adminValidator.helper.js');
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../controller/category.controller.js');
const { userCreateValidator, userUpdateValidator, userDeleteValidator,postLikeAndUnlikeValidator, postLikeCountValidator} = require('../helpers/authValidator.helper.js')
const { createUser, updateUser, getUsers, deleteUser} = require('../controller/user.controller.js')
const { likePost, unLikePost, postLikeCount } = require('../controller/like.controller.js')

//.............................category route...........................
router.post('/add-category', verifyJWT, categoryAddValidator, addCategory);
router.get('/get-category', verifyJWT, getCategories);
router.post('/update-category', verifyJWT, categoryUpdateValidator, updateCategory);
router.delete('/delete-category', verifyJWT, categoryDeleteValidator, deleteCategory);

//....................post router..................................
router.post('/create-post', verifyJWT, postCreateValidator, createPost)
router.get('/get-post',verifyJWT,getPosts)
router.post('/update-post',verifyJWT, postUpdateValidator,updatePost)
router.delete('/delete-post',verifyJWT,postDeleteValidator,deletePost)

//................like and unlike post and count-like..............
router.post('/like-post', verifyJWT, postLikeAndUnlikeValidator, likePost)
router.post('/unLike-post', verifyJWT, postLikeAndUnlikeValidator, unLikePost)
router.get('/count-postLike', verifyJWT, postLikeCountValidator, postLikeCount)

//................user creation by admin/sub-admin
router.post('/create-user',verifyJWT,userCreateValidator,createUser)
router.post('/update-user',verifyJWT,userUpdateValidator,updateUser)
router.get('/get-users',verifyJWT,getUsers)
router.delete('/delete-user',verifyJWT,userDeleteValidator,deleteUser)

module.exports = router;