const errorHandler = (err, req, res, next) => {
	// if (err.message === 'Unauthorized') {
	//   return res.status(401).json({ message: err.message });
	// }

	// Default to 400 error
	return res.status(400).json({ reason: err.message });
};

module.exports = errorHandler;
