const { Category } = require('../categoryModel');

const updateDefaultById = (id, value) => {
  const result = Category.findByIdAndUpdate(id, value, {
    select: '-createdAt -updatedAt',
    new: true,
  });
  return result;
};

module.exports = updateDefaultById;
