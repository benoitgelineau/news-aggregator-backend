const errorHandler = (err, req, res, next) => {
	// Default to 400 error
	return res.status(400).json({ reason: err.message });
};

module.exports = errorHandler;
