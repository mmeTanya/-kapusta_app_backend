const { User } = require('../userModel');

const addUser = async user => {
  const result = await User.create(user);
  return result;
};

module.exports = addUser;
