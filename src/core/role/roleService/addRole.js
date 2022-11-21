const { Role } = require('../roleModel');

const addRole = async role => {
  const result = await Role.create(role);
  return result;
};

module.exports = addRole;
