const express = require('express')

const router = express();
const verifyJWT = require('../middleware/auth.middleware.js');
const onlyAdminAccess = require('../middleware/admin.middleware.js');
const { createPost, getPosts, updatePost , deletePost } = require('../controller/post.controller.js');
const { categoryAddValidator, categoryUpdateValidator, categoryDeleteValidator, postCreateValidator, postUpdateValidator, postDeleteValidator } = require('../helpers/adminValidator.helper.js');
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../controller/category.controller.js');

//category route
router.post('/add-category', verifyJWT, categoryAddValidator, addCategory);
router.get('/get-category', verifyJWT, getCategories);
router.post('/update-category', verifyJWT, categoryUpdateValidator, updateCategory);
router.delete('/delete-category', verifyJWT, categoryDeleteValidator, deleteCategory);

//post router
router.post('/create-post', verifyJWT, postCreateValidator, createPost)
router.get('/get-post',verifyJWT,getPosts)
router.post('/update-post',verifyJWT, postUpdateValidator,updatePost)
router.delete('/delete-post',verifyJWT,postDeleteValidator,deletePost)


module.exports = router;