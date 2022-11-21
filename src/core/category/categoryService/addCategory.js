const { Category } = require('../categoryModel');

const addCategory = async category => {
  const result = await Category.create(category);
  return result;
};

module.exports = addCategory;
