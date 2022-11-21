const { User } = require('../userModel');

const updateUserTokenById = async (userId, token) => {
  const result = await User.findByIdAndUpdate(userId, { token });
  return result;
};

module.exports = updateUserTokenById;
