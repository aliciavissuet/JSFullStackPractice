const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');


// @route   GET api/aacgrids/test
// @desc    Tests aacgrids route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "AAC Grids Works for now"}));





module.exports = router;

