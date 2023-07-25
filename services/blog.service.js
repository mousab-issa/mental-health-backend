// routes/blogPost.routes.js
const express = require("express");
const router = express.Router();
const blogPostService = require("../services/blogPost.service");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const blogPosts = await blogPostService.getBlogPosts(
      Number(page),
      Number(limit)
    );
    res.status(200).json({ status: "success", data: blogPosts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const blogPost = await blogPostService.createBlogPost(req.body);
    res.status(201).json({ status: "success", data: blogPost });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogPost = await blogPostService.getBlogPost(req.params.id);
    if (!blogPost) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog post not found." });
    }
    res.status(200).json({ status: "success", data: blogPost });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedBlogPost = await blogPostService.deleteBlogPost(req.params.id);
    if (!deletedBlogPost) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog post not found." });
    }
    res.status(200).json({ status: "success", data: deletedBlogPost });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const updatedBlogPost = await blogPostService.updateBlogPost(
      req.params.id,
      req.body
    );
    if (!updatedBlogPost) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog post not found." });
    }
    res.status(200).json({ status: "success", data: updatedBlogPost });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
