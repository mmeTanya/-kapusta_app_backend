const { User } = require('../userModel');

const getUserByEmail = async userEmail => {
  const result = await User.findOne(
    { email: userEmail },
    '-createdAt -updatedAt',
  );
  return result;
};

module.exports = getUserByEmail;
