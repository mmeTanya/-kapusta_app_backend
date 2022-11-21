const transactionService = require('../../transaction/transactionService');

const getIncomeReportByMonth = async (req, res) => {
  const { _id } = req.user;
  const { month, year, limit } = req.query;
  const incomeByMonth = await transactionService.getReportTransactionByMonth(
    _id,
    year,
    month,
    'income',
    limit,
  );

  res.status(200).json({
    incomeByMonth,
  });
};

module.exports = getIncomeReportByMonth;
