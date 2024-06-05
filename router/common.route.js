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
const { checkPermission } = require('../middleware/checkPermission.middleware.js')

//.............................category route...........................
router.post('/add-category', verifyJWT,checkPermission, categoryAddValidator, addCategory);
router.get('/get-category', verifyJWT, checkPermission,  getCategories);
router.post('/update-category', verifyJWT, checkPermission,  categoryUpdateValidator, updateCategory);
router.delete('/delete-category', verifyJWT, checkPermission,  categoryDeleteValidator, deleteCategory);

//....................post router..................................
router.post('/create-post', verifyJWT, checkPermission,  postCreateValidator, createPost)
router.get('/get-post',verifyJWT, checkPermission, getPosts)
router.post('/update-post',verifyJWT, checkPermission,  postUpdateValidator,updatePost)
router.delete('/delete-post',verifyJWT, checkPermission, postDeleteValidator,deletePost)

//................like and unlike post and count-like..............
router.post('/like-post', verifyJWT, checkPermission,  postLikeAndUnlikeValidator, likePost)
router.post('/unLike-post', verifyJWT, checkPermission,  postLikeAndUnlikeValidator, unLikePost)
router.get('/count-postLike', verifyJWT, checkPermission,  postLikeCountValidator, postLikeCount)

//................user creation by admin/sub-admin
router.post('/create-user',verifyJWT, checkPermission, userCreateValidator,createUser)
router.post('/update-user',verifyJWT, checkPermission, userUpdateValidator,updateUser)
router.get('/get-users',verifyJWT, checkPermission, getUsers)
router.delete('/delete-user',verifyJWT, checkPermission, userDeleteValidator,deleteUser)

module.exports = router;