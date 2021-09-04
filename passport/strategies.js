const fs = require('fs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const User = require('../models/user');
const { cookieExtractor } = require('../utils/cookieHandler');

const publicKey = fs.readFileSync('./public-key.pem', 'utf8');

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (login, password, done) => {
			try {
				const user = await User.findOne({ login });
				if (!user) {
					return done(null, false, { reason: 'Account not found.' });
				}

				const validate = await user.isValidPassword(password);
				if (!validate) {
					return done(null, false, { reason: 'Incorrect password.' });
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: publicKey,
			issuer: process.env.JWT_ISSUER,
			audience: process.env.PUBLIC_URL,
			algorithms: ['RS256'],
		},
		async (jwtPayload, done) => {
			try {
				return done(null, jwtPayload);
			} catch (err) {
				return done(err);
			}
		}
	)
);
