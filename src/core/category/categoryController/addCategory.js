const categoryService = require('../categoryService');
const userService = require('../../user/userService');
const { createError } = require('../../../helpers');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const { _id, categories } = req.user;
  let user = null;
  console.log(categories.length);
  if (categories.length >= 15) {
    throw createError(
      409,
      'Category list is full, at the next request, remove category from the list',
    );
  }
  const category = await categoryService.getCategoryByName(name);
  if (category) {
    const userHasCategory = categories.includes(category._id);
    if (userHasCategory) {
      throw createError(409, 'User has this category at the list');
    }
    user = await userService.addUserCategoriesById(_id, category._id);
    res.status(200).json({
      message: 'Category added successfully',
      user,
    });
  }
  const newCategory = await categoryService.addCategory({ ...req.body });
  user = await userService.addUserCategoriesById(_id, newCategory._id);
  res.status(200).json({
    message: 'Category added successfully',
    user,
  });
};

module.exports = addCategory;
