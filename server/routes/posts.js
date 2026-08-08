const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.get('/', async(req, res) => {
    try{
        const posts = await Post.find().sort('-createdAt');
        res.json(posts);
    }catch(err){
        res.status(500).json({message: err.message});   

    }
});


router.get('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.json(post);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/', async(req, res) => {
    const { title, content , author }= req.body;
    const post = new Post({title, content, author});
    try{
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    }catch(err){
        res.status(400).json({message: err.message});       

    }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;