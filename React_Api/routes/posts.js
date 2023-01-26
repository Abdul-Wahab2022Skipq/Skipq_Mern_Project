const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post is updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("the post is deleted");
    } else {
      res.status(403).json("you can deleted only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post is like");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post is disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(200).json(err);
  }
});

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip;
  try {
    const currentUser = await User.findById(req.params.userId);
    const IdList = [currentUser._id.toString()];
    currentUser.followings.map((Id) => {
      IdList.push(Id);
    });
    const ListPosts = await Post.find({ userId: { $in: IdList } })
      .limit(limit)
      .skip(skip)
      .sort("-createdAt");
    const count = await Post.find({ userId: { $in: IdList } }).count();

    res.status(200).json({ count: count, posts: ListPosts });
  } catch (err) {
    res.status(500).json("err");
  }
});

// get User's all posts
router.get("/profile/:username", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip;
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id })
      .limit(limit)
      .skip(skip)
      .sort("-createdAt");
    const count = await Post.find({ userId: user._id }).count();

    const list = {
      count: count,
      posts: posts,
    };
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
