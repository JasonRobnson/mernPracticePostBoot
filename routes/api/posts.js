const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/post.js');
const validatePostInput = require('../../validation/post');


//@route Get api/posts/test
//@desc Test post route
//@access Public
router.get('/test', (req, res) => res.json({msg:'Posts Works'}));

//@route POST  api/posts
//@desc  post route
//@access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
      if(!isValid) {
        return res.status(400).json(errors);
      }
  const newPost = new Post ({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  
  console.log("this is a test")
  newPost.save().then(post => res.json(post));
});
module.exports = router;