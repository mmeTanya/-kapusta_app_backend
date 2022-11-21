const { Role } = require('../roleModel');

const getRoleByName = async roleName => {
  const result = await Role.findOne(
    { name: roleName },
    '-createdAt -updatedAt',
  );
  return result;
};

module.exports = getRoleByName;
