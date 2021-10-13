const passport = require('passport');
const { getTokenHeader } = require('../utils/cookieHandler');

const validateJwtAuthentication = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, payload, info) => {
    if (!payload) {
      return res.status(401).json({
        reason: err ? err.message : 'Invalid token.',
      });
    }
    res.locals.user = payload;
    const cookieHeaderAndPayload = getTokenHeader();
    // ADD NEW 30 MINUTES
    res.cookie(
      cookieHeaderAndPayload.name,
      req.cookies[cookieHeaderAndPayload.name],
      cookieHeaderAndPayload.options
    );
    next();
  })(req, res, next);
};

module.exports = validateJwtAuthentication;
