const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const bookmarksController = require('../controllers/bookmarksController');
const validateJwtAuthentication = require('../passport/utils');

/* ACCOUNT */
router.post('/account', accountController.createAccount);

/* AUTHENTICATION */
router.post('/signIn', authController.signIn);
router.post('/signOff', authController.signOff);

/** BOOKMARKS */
router.get(
	'/bookmarks',
	validateJwtAuthentication,
	bookmarksController.get_bookmarks
);
router.post(
	'/bookmarks',
	validateJwtAuthentication,
	bookmarksController.insert_bookmark
);
router.put(
	'/bookmarks',
	validateJwtAuthentication,
	bookmarksController.remove_bookmark
);

module.exports = router;
