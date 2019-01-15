//just gonna deal with authentication

const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input Validation 
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route Get api/auth/test
//@desc Test auth route
//@access Private
router.get('/test', (req, res) => res.json({msg: "Auth Works"}));

//@route Get api/auth/register
//@desc Register auth route
//@access Public
router.post('/register', (req, res) => {
 
  //Destructuring
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(isValid)
  //check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(user) {
      errors.email = 'Email already exists'
      return res.status(400).json({errors})
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', //rating
        d: 'mm'//default
      });

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

  //Destructuring
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
  .then(user => {
    if(!user) {
      errors.email = 'User not found';
       return res.status(404).json(errors);
    }
    
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        //Create User JWT Payload
        const payload = { id: user.id , name: user.name, avatar: user.avatar};

        //sign JWT
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
           res.json({
             success: true, 
             token: 'Bearer ' + token
           })
        })
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors)
      }
    })
  })
})

//@route Get api/auth/current
//@desc Return Current User
//@access Private
router.get('/current', passport.authenticate('jwt', { session: false }),  (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar, 
    date: req.user.date

  })
})

module.exports = router; 