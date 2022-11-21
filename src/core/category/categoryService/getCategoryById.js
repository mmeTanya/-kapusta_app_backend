const { Category } = require('../categoryModel');

const getCategoryById = async id => {
  const result = await Category.findById(id, '-createdAt -updatedAt');
  return result;
};

module.exports = getCategoryById;
