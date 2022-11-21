const { Category } = require('../categoryModel');

const getDefaultCategory = async () => {
  const result = await Category.find(
    { default: true },
    '-createdAt -updatedAt',
  );
  return result;
};

module.exports = getDefaultCategory;
