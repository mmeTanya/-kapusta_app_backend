const { User } = require('../userModel');

const deleteUserById = id => {
  const result = User.findByIdAndRemove(id);
  return result;
};

module.exports = deleteUserById;
