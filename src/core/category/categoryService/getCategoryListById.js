const { Category } = require('../categoryModel');

const getCategoryListById = async categoryList => {
  const promises = categoryList.map(item => {
    return Category.findById(item, '-createdAt -updatedAt');
  });
  const result = await Promise.all(promises);

  return result;
};

module.exports = getCategoryListById;
