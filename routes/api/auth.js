//just gonna deal with authentication

const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//@route Get api/auth/test
//@desc Test auth route
//@access Private
router.get('/test', (req, res) => res.json({msg: "Auth Works"}));

//@route Get api/auth/register
//@desc Register auth route
//@access Public
router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(user) {
      return res.status(400).json({email: 'Email already exists'})
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', //rating
        d: 'mm'//default
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password, 
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err; 
          newUser.password = hash;
          newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        })
      })
    }
  })
});

//@route Get api/auth/login
//@desc Returning JWT
//@access Public
router.post('/login', (req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
  .then(user => {
    if(!user) {
       return res.status(404).json({email: 'User not found'});
    }
    
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        res.json({msg: 'Welcome Back!'});
      } else {
        return res.status(400).json({password: 'Password incorrect'})
      }
    })
  })
})
module.exports = router; 