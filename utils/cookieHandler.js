const getTokenHeader = () => ({
	name: 'token',
	options: {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 1000 * 60 * 30, // 30mn
		sameSite: true,
	},
	getPayload: getHeaderAndPayload,
});

const getTokenSignature = () => ({
	name: 'tokenSignature',
	options: {
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		sameSite: true,
	},
	getPayload: getSignature,
});

const cookieExtractor = ({ cookies }) => {
	const cookieHeaderAndPayload = getTokenHeader();
	const cookieSignature = getTokenSignature();
	return cookies[cookieHeaderAndPayload.name] && cookies[cookieSignature.name]
		? `${cookies[cookieHeaderAndPayload.name]}.${cookies[cookieSignature.name]}`
		: null;
};

function getHeaderAndPayload(token) {
	const array = token.split('.');
	array.pop();
	return array.join('.');
}

function getSignature(token) {
	return token.split('.')[2];
}

module.exports = {
	getTokenHeader,
	getTokenSignature,
	cookieExtractor,
};
