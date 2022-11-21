const userService = require('../../user/userService');

const logout = async (req, res) => {
  const { _id } = req.user;
  const token = null;
  await userService.updateUserById(_id, token);
  res.status(204).json();
};

module.exports = logout;
