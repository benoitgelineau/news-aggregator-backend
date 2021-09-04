const User = require('../models/user');

const getBookmarks = async (req, res, next) => {
	try {
		const { locals } = res;
		const user = await User.findById(locals.user._id).select('-password');
		return res.status(200).json(user.bookmarks);
	} catch (error) {
		next(error);
	}
};

const addBookmark = async (req, res, next) => {
	try {
		await User.findOneAndUpdate(
			{
				id: res.locals.user._id,
				'bookmarks.id': {
					$ne: req.body.article.id,
				},
			},
			{
				$push: { bookmarks: { ...req.body.article } },
				$set: { updatedAt: Date.now() },
			},
			{ new: true }
		);

		return res.status(201).end();
	} catch (error) {
		next(error);
	}
};

const deleteBookmark = async (req, res, next) => {
	try {
		await User.findByIdAndUpdate(
			res.locals.user._id,
			{
				$pull: { bookmarks: { id: req.body.id } },
				$set: { updatedAt: Date.now() },
			},
			{ new: true }
		);

		return res.status(204).end();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getBookmarks,
	addBookmark,
	deleteBookmark,
};
