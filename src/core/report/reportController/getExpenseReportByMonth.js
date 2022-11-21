const transactionService = require('../../transaction/transactionService');

const getExpenseReportByMonth = async (req, res) => {
  const { _id } = req.user;
  const { month, year, limit } = req.query;
  const expensesByMonth = await transactionService.getReportTransactionByMonth(
    _id,
    year,
    month,
    'expenses',
    limit,
  );

  res.status(200).json({
    expensesByMonth,
  });
};

module.exports = getExpenseReportByMonth;
