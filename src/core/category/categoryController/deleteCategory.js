const categoryService = require('../categoryService');
const userService = require('../../user/userService');
const { createError } = require('../../../helpers');

const deleteCategory = async (req, res) => {
  const { _id: id } = req.user;
  const { categoryId } = req.params;
  const category = await categoryService.getCategoryById(categoryId);
  if (!category) {
    throw createError(404);
  }
  if (category.default === true) {
    throw createError(403, 'It is default. You have no permission');
  }
  const user = await userService.deleteUserCategoriesById(id, categoryId);

  const result = await categoryService.deleteCategoryById(categoryId);
  if (!result) {
    throw createError(404);
  }
  res.status(200).json({
    message: 'Category deleted successfully',
    user,
  });
};

module.exports = deleteCategory;
