const { User } = require('../userModel');

const updateUserBalanceById = async (userId, newBalance) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { balance: newBalance },
    { new: true },
  );
  return result;
};

module.exports = updateUserBalanceById;
