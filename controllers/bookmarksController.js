const User = require('../models/user');

const get_bookmarks = async ({ user: { _id } }, res) => {
	const user = await User.findById(_id).select('-password');
	return res.status(200).json(user.bookmarks);
};

const insert_bookmark = async (req, res) => {
	const { _id } = req.user;
	const { article } = req.body;
	await User.findByIdAndUpdate(
		_id,
		{
			$push: { bookmarks: { ...article } },
			$set: { updatedAt: Date.now() },
		},
		{ new: true }
	).select('-password');

	return res.status(201);
};

const remove_bookmark = async (req, res) => {
	const { _id } = req.user;
	const { id } = req.body;
	await User.findByIdAndUpdate(
		_id,
		{
			$pull: { bookmarks: { id } },
			$set: { updatedAt: Date.now() },
		},
		{ new: true }
	).select('-password');

	return res.status(204).end();
};

module.exports = {
	get_bookmarks,
	insert_bookmark,
	remove_bookmark,
};
