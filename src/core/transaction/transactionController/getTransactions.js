const transactionService = require('../transactionService');

const getTransactions = async (req, res) => {
  const { date } = req.params;
  const { type, page = 1, limit = 10 } = req.query;
  const { id } = req.user;
  const skip = (page - 1) * limit;

  const transactions = await transactionService.getTransactionsByDate({
    id,
    date,
    type,
    skip,
    limit,
  });

  res.status(200).json({
    transactions,
  });
};

module.exports = getTransactions;
