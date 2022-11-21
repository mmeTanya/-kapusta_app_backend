const { Category } = require('../categoryModel');

const deleteCategoryById = async id => {
  const result = Category.findByIdAndRemove(id);
  return result;
};

module.exports = deleteCategoryById;
