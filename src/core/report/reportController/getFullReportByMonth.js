const transactionService = require('../../transaction/transactionService');

const getFullReportByMonth = async (req, res) => {
  const { _id } = req.user;
  const { month, year, limit } = req.query;
  const fullReportByMonth = await transactionService.getFullReportByMonth(
    _id,
    year,
    month,
    limit,
  );

  res.status(200).json({
    fullReportByMonth,
  });
};

module.exports = getFullReportByMonth;
