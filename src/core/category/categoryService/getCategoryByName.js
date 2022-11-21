const { Category } = require('../categoryModel');

const getCategoryByName = async categoryName => {
  const result = await Category.findOne(
    { name: categoryName },
    '-createdAt -updatedAt',
  );
  return result;
};

module.exports = getCategoryByName;
