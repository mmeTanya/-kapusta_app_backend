const jwt = require('jsonwebtoken');
const { createError } = require('../helpers');

const checkRoles = roles => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }
    const [bearer, token] = req.headers.authorization.split(' ');
    if (!(bearer === 'Bearer' && token)) {
      res.status(401);
      next(createError(401, 'Not authorized'));
    }
    let hasRole = false;

    const { roles: userRoles } = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET,
    );
    userRoles.forEach(role => {
      if (roles.includes(role)) {
        hasRole = true;
      }

      if (!hasRole) {
        next(createError(401, 'You have no permissions'));
      }
    });
    next();
  };
};

module.exports = checkRoles;
