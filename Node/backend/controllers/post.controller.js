import { Post } from "../models/post.model.js";

// C --> Create a post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const post = await Post.create({
      name,
      description,
      age,
    });

    res.status(201).json({ message: "Post created successfully!", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// R --> Read all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// U --> Update post
const updatePost = async (req, res) => {
  try {
    // basic validation to check if the body is empty
    // {name: x, description: y, age: z} --> [name, description, age]
    // reason: {} = truthy
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided to update!" });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    res.status(201).json({ message: "Post updated successfully!", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// D --> Delete Post
const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }

    res.status(201).json({
      message: "Post deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export { createPost, getPosts, updatePost, deletePost };
