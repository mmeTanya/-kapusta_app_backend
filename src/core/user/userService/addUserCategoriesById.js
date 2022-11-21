const { User } = require('../userModel');

const addUserCategoriesById = async (userId, categoryId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { categories: categoryId } },
    { new: true },
  );

  return user;
};

module.exports = addUserCategoriesById;
