const passport = require('passport');

const validateJwtAuthentication = (req, res, next) => {
	passport.authenticate('jwt', (err, payload, info) => {
		if (err || info) {
			// next(new Error('Unauthorized'));
			res.locals.user = undefined;
			next();
		} else {
			res.locals.user = payload;
			// ADD NEW 30 MINUTES
			res.cookie('jwt_header&payload', req.cookies['jwt_header&payload'], {
				secure: true,
				maxAge: 1000 * 60 * 30, // 30mn
				sameSite: true,
			});
			next();
		}
	})(req, res, next);
};

module.exports = validateJwtAuthentication;
