const express = require('express');
const router = express.Router();
const passport = require('passport');

const user_controller = require('../controllers/user.controller');

router.post('/signup', passport.authenticate('signup', { session: false }), user_controller.signUp);
router.post('/login', user_controller.logIn);
router.post('/logout', user_controller.logOut);

module.exports = router;