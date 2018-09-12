//location bio, experience and suchconst express = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateExperienceInput = require('../../validation/experience')
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route Get api/profile/test
//@desc Test profile route
//@access Public
router.get('/test', (req, res) => res.json({msg:'Profile Works'}));


//@route Get api/profile
//@desc Get Current User Profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
 const errors = {};
  Profile.findOne({ user: req.user.id})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch( err => res.status(404).json(err));
});


//@route GET  api/profile/all
//@desc Get all profiles
//@access Public
router.get('/all', (req, res) => {
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.profiles = 'There are no profiles!';
      return res.status(404).json(errors)
    }
    res.json(profiles)
  })
})


//@route GET  api/profile/handle/:handle
//@desc Get Profile by handle
//@access Public
router.get('/handle/:handle', (req, res) => {
  console.log(req.params.handle)
  Profile.findOne({ handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There are no profiles';
      return res.status(400).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json({ profile: 'There are no profiles' }))
});


//@route GET  api/profile/user/:userid
//@desc Get Profile by handle
//@access Public
router.get('/user/:user_id', (req, res) => {
  Profile.findOne({ user: req.params.user_id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(400).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json({ profile: 'There is no profile for this user!'}));
});


//@route POST  api/profile
//@desc Create -or edit User Profile
//@access Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
const { errors, isValid } = validateProfileInput(req.body); 
  //Check Validation
  if(!isValid) {
    //return any errors
    return res.status(400).json(errors);
  }
  
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
  //Skill split into array
  if(typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  profileFields.social = {}; 
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    if(profile) {
      //UPDATE
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true})
      .then(profile => res.json(profile));
    } else {
      //Create
      //Check if handle exist
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if(profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }
      
        //save profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      })
    }
  })
 });


 //@route POST  api/profile/experience
//@desc Create experience for profile
//@access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body)
  const { errors, isValid } = validateExperienceInput(req.body); 
  console.log( req.body )
    //Check Validation
     if(!isValid) {
     //return any errors
     return res.status(400).json(errors);
}
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }
    
    
    //add to exp array
    profile.experience.unshift(newExp);
      
    profile.save().then(profile => res.json(profile));
  })
})

 //@route POST  api/profile/experience
//@desc Create experience for profile
//@access Private



module.exports = router;