const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const AacGrid = require('../../models/AacGrid');
const validateAacGridInput = require('../../validation/aacgrid');
const validateCommentInput = require('../../validation/comment');


// @route   GET api/aacgrids/test
// @desc    Tests aacgrids route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "AAC Grids Works for now"}));

//@route get api/aacgrids
//@desc get grids
//@access public
router.get('/', (req, res) => {
    AacGrid.find()
        .sort({date:-1})
        .then(grids => res.json(grids))
        .catch(err => res.status(404).json({error:'no grids found'}))
});

//@route get api/aacgrids
//@desc get specific grid
//@access public
router.get('/:grid_id', (req, res)=>{
    AacGrid.findOne({_id:req.params.grid_id})
        .then(grid => res.json(grid))
        .catch(err => res.status(404).json({error:'grid not found'}))
});

//@route post api/aacgrids
//@desc Create grid
//@access private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res)=> {
    const {errors, isValid} = validateAacGridInput(req.body);

    if(!isValid){
        res.status(400).json(errors)
    }

    const newGrid = new AacGrid({
        description: req.body.description,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id,
        title: req.body.title,
        rows:req.body.rows,
        columns:req.body.columns

    });

    newGrid.save().then(grid => res.json(grid));
});

//@route delete api/aacgrids/grid id
//@desc delete grid
//@access private
router.delete('/:grid_id', passport.authenticate('jwt', {session:false}), (req, res) =>{
    AacGrid.findById(req.params.grid_id)
        .then(grid => {
            if(grid.user.toString()!== req.user.id){
                return res.status(401).json({notauthorized:'user not authorized'});
            }
            grid.remove().then(()=> res.json({success: true}));
        })
        .catch(err => res.status(404).json({gridnotfound:'no grid found'}));

});

//@route favorite an api/grid
//@desc favorite a grid
//@access private
router.post('/favorite/:grid_id', passport.authenticate('jwt', {session:false}), (req, res) =>{
    AacGrid.findById(req.params.grid_id)
        .then(grid => {
            if(grid.favorites.filter(favorite => favorite.user.toString()===req.user.id).length>0){
                return res.status(400).json({ alreadyfavorited:'user already favorited this grid'});
            }
            //add user id to likes array
            grid.favorites.unshift({user:req.user.id});
            grid.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({postnotfound:'no grid found'}));

});

//@route unfavorite api/aacgrid/unfavorite/id
//@desc unfavorite a grid
//@access private

router.post('/unfavorite/:grid_id', passport.authenticate('jwt', {session:false}), (req, res) =>{
    AacGrid.findById(req.params.grid_id)
        .then(grid =>{
            if(grid.favorites.filter(favorite => favorite.user.toString()===req.user.id).length===0){
                return res.status(400).json({didNotLike:'user has not favorited this grid'})
            }
            //remove user from likes array
            grid.favorites=grid.favorites.filter(favorite => favorite.user.toString()!==req.user.id)
            grid.save().then(grid => res.json(grid))
        })
        .catch(err => res.status(404).json({postnotfound: 'no grid found'}));
});

//@route POST api/aacgrids/gridItem/:grid_id
//@desc Add grid item to grid
//@access Private
router.post('/gridItem/:grid_id', passport.authenticate('jwt', {session:false}), (req, res)=>{
    // const {errors, isValid} = validateCommentInput(req.body);
    //
    // if(!isValid){
    //     res.status(400).json(errors)
    // }

    AacGrid.findById(req.params.grid_id)
        .then(grid => {
            const newGridItem = {
                text:req.body.text,
                image:req.body.image
            };
            grid.gridItems.unshift(newGridItem);
            grid.save().then(grid => res.json(grid))
        })
        .catch(err => res.status(404).json({gridnotfound: 'no grid found'}));
});

router.delete('/gridItem/:grid_id/:gridItem_id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    AacGrid.findById(req.params.grid_id)
        .then(grid => {

            const gridItemList = grid.gridItems.filter( gridItem => gridItem._id.toString() === req.params.gridItem_id);

            if (gridItemList.length === 0){
                res.status(404).json({error:"No grid item found"})
            }
            console.log("hello");

            // if (gridItemList[0].user.toString() !== req.user.id){
            //     res.status(404).json({error:"You are not the gridItem creator"})
            // }

            console.log("hello2");
            // Add user id to likes array
            grid.gridItems = grid.gridItems.filter( gridItem => gridItem._id.toString() !== req.params.gridItem_id);
            grid.save().then(grid => res.json(grid));
        })
        .catch( err => res.status(404).json({gridnotfound: "No grid found with id"}))
});







module.exports = router;

