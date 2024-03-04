const express = require("express");
const router = express.Router();
const ensuretoken = require("../middlewares/ensureToken.js");
const {createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost} = require("../controllers/postscont.js"); 
router.use(ensuretoken)
router.use(express.json());
router.get('/posts',getAllPosts);
router.get('/posts/:id',getPostById)
router.post('/posts',createPost);  
router.put('/posts/:id', updatePost);  
router.delete('/posts/:id', deletePost); 
module.exports=router;