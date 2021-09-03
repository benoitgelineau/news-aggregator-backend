const User = require('../models/user');

const createAccount = async (req, res, next) => {
	const { body } = req;
	if (!body.email || !body.password) {
		return next(Error('Missing credentials.'));
	}

	try {
		const user = await User.create({
			login: body.email,
			password: body.password,
		});
		return res.status(201).json(user);
	} catch (err) {
		// Code for duplicated keys
		if (err.code === 11000) {
			return res
				.status(403)
				.json({ reason: 'This account has already been registered.' });
		}
		next(err);
	}
};

module.exports = {
	createAccount,
};
