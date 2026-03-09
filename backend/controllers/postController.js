const Post = require("../models/Post");
const cache = require("../utils/cache");

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const key = `posts_${page}_${limit}_${search}`;

  // cache only first page without search
  if (page == 1 && !search) {
    const cached = cache.get(key);
    if (cached) return res.json(cached);
  }

  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const posts = await Post.find(query)
    .select("title body userId createdAt")
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  if (page == 1 && !search) {
    cache.set(key, posts);
  }

  res.json(posts);
};


exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
};

exports.createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,

    body: req.body.body,

    userId: req.user.id,
  });

  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post?.userId?.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You can edit only your own posts",
    });
  }

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.userId.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You can delete only your own posts",
    });
  }

  await Post.findByIdAndDelete(req.params.id);

  res.json({ message: "Post deleted" });
};
