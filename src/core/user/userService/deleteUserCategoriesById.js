const { User } = require('../userModel');

const deleteUserCategoriesById = async (userId, categoryId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { categories: categoryId },
    },
    { new: true },
  );

  return user;
};

module.exports = deleteUserCategoriesById;
