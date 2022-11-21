const userService = require('../../user/userService');
const { createError } = require('../../../helpers');
const currentUser = async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  if (!user) {
    throw createError(500, 'Server error');
  }
  res.status(200).json({
    user: req.user,
  });
};

module.exports = currentUser;
