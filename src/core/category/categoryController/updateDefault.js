const categoryService = require('../categoryService');
const { createError } = require('../../../helpers');

const updateDefault = async (req, res) => {
  const { categoryId } = req.params;

  const category = await categoryService.updateDefaultById(
    categoryId,
    req.body,
  );
  if (!category) {
    throw createError(404);
  }
  res.status(200).json({ category });
};

module.exports = updateDefault;
