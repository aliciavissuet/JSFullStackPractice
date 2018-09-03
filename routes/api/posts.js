const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');
const Profile = require('../../models/Profile');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Posts Works for now"}));

//@route get api/post
//@desc get posts
//@access public
router.get('/', (req, res) => {
    Post.find()
        .sort({date:-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({error:'no posts found'}))
});
//@route get api/post
//@desc get posts
//@access public
router.get('/:post_id', (req, res)=>{
    Post.findOne({_id:req.params.post_id})
        .then(post => res.json(post))
        .catch(err => res.status(404).json({error:'post not found'}))
});


//@route Post api/post
//@desc Create post
//@access private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res)=> {
    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid){
        res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
        title: req.body.title

    });

    newPost.save().then(post => res.json(post));
});

//@route delete api/post
//@desc delete posts
//@access private
router.delete('/:post_id', passport.authenticate('jwt', {session:false}), (req, res) =>{
            Post.findById(req.params.post_id)
                .then(post => {
                    if(post.user.toString()!== req.user.id){
                        return res.status(401).json({notauthorized:'user not authorized'});
                    }
                    post.remove().then(()=> res.json({success: true}));
                })
                .catch(err => res.status(404).json({postnotfound:'no post found'}));

});

//@route like api/post
//@desc like a post
//@access private
router.post('/like/:post_id', passport.authenticate('jwt', {session:false}), (req, res) =>{
    Post.findById(req.params.post_id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString()===req.user.id).length>0){
                return res.status(400).json({ alreadyliked:'user already liked this post'});
            }
            //add user id to likes array
            post.likes.unshift({user:req.user.id});
            post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({postnotfound:'no post found'}));

});

//@route unlike api/post/like/id
//@desc unlike a post
//@access private

router.post('/unlike/:post_id', passport.authenticate('jwt', {session:false}), (req, res) =>{
    Post.findById(req.params.post_id)
        .then(post =>{
            if(post.likes.filter(like => like.user.toString()===req.user.id).length===0){
                return res.status(400).json({didNotLike:'user has not liked this post'})
            }
            //remove user from likes array
            post.likes=post.likes.filter(like => like.user.toString()!==req.user.id)
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound: 'no post found'}));
});

//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access Private
router.post('/comment/:id', passport.authenticate('jwt', {session:false}), (req, res)=>{
    const {errors, isValid} = validateCommentInput(req.body);

    if(!isValid){
        res.status(400).json(errors)
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text:req.body.text,
                name:req.body.name,
                avatar:req.body.avatar,
                user:req.user.id,
            }
            post.comments.unshift(newComment);
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound: 'no post found'}));
});

//@route POST api/posts/deletecomment/:id
//@desc delete comment on post
//@access Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    Post.findById(req.params.post_id)
        .then(post => {

            const comment = post.comments.filter( comment => comment._id.toString() === req.params.comment_id);

            if (comment.length === 0){
                res.status(404).json({error:"No comment found"})
            }

            if (comment[0].user.toString() !== req.user.id){
                res.status(404).json({error:"You are not the comment creator"})
            }

            console.log("hello2")
            // Add user id to likes array
            post.comments = post.comments.filter( comment => comment._id.toString() !== req.params.comment_id);
            post.save().then(post => res.json(post));
        })
        .catch( err => res.status(404).json({postnotfound: "No post found with id"}))
});





module.exports = router;

