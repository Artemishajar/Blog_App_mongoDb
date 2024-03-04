const blog = require("../models/blog.js")

// Create a new blog post
async function createPost(req, res) {
  try {
    const {title, content} = req.body;
    const post = await new blog({
      title,
      content
    });
    //saving the new post
    await post.save()
    .then((post) =>{
      res.send("the post is created successffuly");
    })
    .catch(error => {
      res.send(error.message);
    })

  }catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Get all blog posts
async function getAllPosts(req, res) {
  try {
    const posts = await blog.find()
    res.send(posts);
  } catch (error) {
    console.error('Error getting all posts:', error);
    throw error;
  }
}

// Get a single blog post by ID 
async function getPostById(req, res) {
  try {
    const post = await blog.findById(req.params.id)
    res.send(post)
    if (!post) {
      res.send('Post not found');
    }
    } catch (error) {
    console.error('Error getting post by ID:', error);
    throw error;
  }
}

// Update a blog post by ID
async function updatePost(req, res) {
  try {
    const {title, content} = req.body;
    const updatedPost = await blog.findOneAndUpdate({_id: req.params.id}, {$set: {title:title,content:content}});
    if (!updatedPost) {
      return res.send('Post not found');
    }
    res.send("post updated successfully")
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// Delete a blog post by ID
async function deletePost(req, res) {
  try {
    const deletedPost = await blog.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.send('Post not found');
    }
    res.send("post deleted")
    } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
