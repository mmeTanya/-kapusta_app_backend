const { createError } = require('../../../helpers');

const transactionService = require('../transactionService');

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  console.log(transactionId);

  const result = await transactionService.deleteTransactionById(transactionId);
  if (!result) {
    throw createError(404);
  }

  res.status(200).json({
    message: 'Transaction deleted successfully',
    transaction: result,
  });
};

module.exports = deleteTransaction;
