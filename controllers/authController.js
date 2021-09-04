const passport = require('passport');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {
	getJwtHeaderPayload,
	getJwtSignature,
} = require('../utils/cookieHandler');

const signIn = async (req, res, next) => {
	// SignIn after verify_user, if token, I should be able to signIn without creating a new token
	passport.authenticate(
		'login',
		{ session: false },
		async (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				const reason = (info && info.reason) || 'User not found.';
				return res.status(404).json({
					reason,
				});
			}

			try {
				const payload = { _id: user.id };
				const { APP_URL } = process.env;
				const privateKey = fs.readFileSync('./private-key.pem', 'utf8');
				const options = {
					issuer: 'Benoit G.',
					audience: APP_URL,
					algorithm: 'RS256',
				};
				const token = jwt.sign(payload, privateKey, options);

				res.cookie('jwt_header&payload', getJwtHeaderPayload(token), {
					secure: true,
					maxAge: 1000 * 60 * 30, // 30mn
					sameSite: true,
				});
				res.cookie('jwt_signature', getJwtSignature(token), {
					secure: true,
					httpOnly: true,
					sameSite: true,
				});

				return res.status(200).end();
			} catch (error) {
				return next(error);
			}
		}
	)(req, res, next);
};

const signOff = (req, res) => {
	res.clearCookie('jwt_header&payload');
	return res.status(200).end();
};

module.exports = {
	signIn,
	signOff,
};
