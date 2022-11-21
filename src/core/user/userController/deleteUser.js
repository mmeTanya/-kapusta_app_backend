const userService = require('../../user/userService');
const { createError } = require('../../../helpers');

const deleteUser = async (req, res) => {
  const { _id: id } = req.user;

  const user = await userService.deleteUserById(id);
  if (!user) {
    throw createError(500, 'Server error');
  }

  res.status(200).json({
    message: 'User deleted successfully',
    user,
  });
};
module.exports = deleteUser;
