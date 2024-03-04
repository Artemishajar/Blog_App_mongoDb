const mongoose = require('mongoose');

// Define the schema for a blog post
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  author: {

    type: mongoose.Schema.Types.ObjectId,
  
    ref: 'User',

  }
}, 
{
  timestamps: true,
}
);
const blog = mongoose.model('blog', blogSchema);

module.exports = blog;