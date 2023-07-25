// services/blogPost.service.js
const cloudinary = require("cloudinary").v2;
const BlogPost = require("../models/blog.schema");

exports.getBlogPosts = async (page, limit) => {
  return await BlogPost.find()
    .skip((page - 1) * limit)
    .limit(limit);
};

exports.getBlogPost = async (id) => {
  return await BlogPost.findById(id);
};

exports.createBlogPost = async (blogPostData) => {
  const blogPost = new BlogPost(blogPostData);
  return await blogPost.save();
};

exports.deleteBlogPost = async (blogPostId) => {
  const blogPost = await BlogPost.findById(blogPostId);
  if (!blogPost) {
    throw new Error("Blog post not found.");
  }

  const imagePublicId = blogPost.image.split("/").pop().split(".")[0];
  const thumbnailPublicId = blogPost.thumbnail.split("/").pop().split(".")[0];

  try {
    // Deleting image and thumbnail from Cloudinary
    await Promise.all([
      cloudinary.uploader.destroy(imagePublicId),
      cloudinary.uploader.destroy(thumbnailPublicId),
    ]);

    // Deleting blog post from the database
    return await BlogPost.findOneAndDelete({ _id: blogPostId });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateBlogPost = async (blogPostId, updateData) => {
  return await BlogPost.findByIdAndUpdate(blogPostId, updateData, {
    new: true,
  });
};
