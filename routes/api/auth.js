//just gonna deal with authentication

const express = require('express');
const router = express.Router();

//@route Get api/auth/test
//@desc Test auth route
//@access Private
router.get('/test', (req, res) => res.json({msg: "Auth Works"}));

module.exports = router; 