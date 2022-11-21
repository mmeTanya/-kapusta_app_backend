const { Transaction } = require('../transactionModel');
const { getCategoryById } = require('../../category/categoryService');

const createTransaction = async transactionData => {
  const { category: categoryId, type } = transactionData;
  const category = await getCategoryById(categoryId);
  if (!category || category.type !== type) {
    return null;
  }
  const result = await (
    await Transaction.create(transactionData)
  ).populate('category', 'name default');
  return result;
};

module.exports = createTransaction;
