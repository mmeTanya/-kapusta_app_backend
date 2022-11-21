const categoryService = require('../categoryService');

const getCategoryList = async (req, res) => {
  const { categories } = req.user;

  const categoryList = await categoryService.getCategoryListById(categories);

  res.status(200).json({ categoryList });
};

module.exports = getCategoryList;
