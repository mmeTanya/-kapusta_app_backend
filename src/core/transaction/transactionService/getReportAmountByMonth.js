const { Transaction } = require('../transactionModel');
const aggregations = require('./aggregations');
const { transformDate } = require('../../../helpers');

const getReportTransactionExpenses = async (_id, year, month, type, limit) => {
  const date = transformDate(year, month);

  if (!limit) limit = 1000;

  const result = await Transaction.aggregate(
    aggregations.reportAmountByMonth(_id, type, Number(limit)),
  );

  const trimDateResult = result.map(item => {
    const indexEndDate = item.date.indexOf('T');
    const trimDate = item.date.substr(0, indexEndDate);
    return {
      _id: item._id.month,
      date: trimDate,
      type: item._id.type,
      totalSum: item.totalSum,
    };
  });
  const filterByDateResult = trimDateResult.filter(item => item.date === date);

  return date ? filterByDateResult : trimDateResult;
};

module.exports = getReportTransactionExpenses;
