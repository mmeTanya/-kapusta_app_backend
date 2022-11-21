const { createError } = require('../../../helpers');
const transactionService = require('../transactionService');

const addExpenseTransaction = async (req, res) => {
  const { _id } = req.user;

  const transaction = await transactionService.createTransaction({
    ...req.body,
    owner: _id,
  });
  if (!transaction) {
    throw createError(400, 'Wrong category ID');
  }
  res.status(201).json({
    message: 'Transaction created successfully',
    transaction,
  });
};

module.exports = addExpenseTransaction;
