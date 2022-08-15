const { handlePostImageUpload } = require("../services/postServices");
const { Post } = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        let data = req.body.post;
        if(data.includes('<img')) data = handlePostImageUpload(req.files, req.body);

        const post = await Post.create({title: req.body.title, content: data, authorId: req.user._id});
        res.status(200).json({ post});
    } catch (error) {
        console.log(16, error);
        res.status(500).json({message: 'server error', error});
    }
}

exports.updatePost = async (req, res) => {
    try {
        let data = req.body.post;
        req.body.content = req.body.post;
        if (req.files.length) data = handlePostImageUpload(req.files, req.body);
        const post = await Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true, runValidators: true});
        res.status(200).json({ post});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.postId}).populate('authorId')
        // .populate('users').populate('categories');
        res.status(200).json({ post});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
        // .populate('users').populate('categories');
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error', error});
    }
}

exports.checkAuthor = async (req, res) => {
    try {
        const check = await Post.findOne({_id:req.params.postId, authorId: req.params.authorId});
        
        if( !check ) return res.status(400).json({message: 'you are not allow'});

        return res.status(200).json({message: 'valid user'});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({authorId: req.user._id});
        res.status(200).json({posts});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

exports.deleteOnePost = async (req, res) => {
    try {

        const check = await Post.findOne({_id: req.params.postId, authorId: req.user._id})
        if(!check) return res.status(400).json({message: 'delete fail'});

        console.log(77, check);
        console.log(78, check.content.split('<img src="').slice(1));
        await Post.deleteOne({_id: req.params.postId, authorId: req.user._id});

        res.status(200).json({message: 'delete success'});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}