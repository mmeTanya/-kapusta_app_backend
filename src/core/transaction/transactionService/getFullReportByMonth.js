const { Transaction } = require('../transactionModel');
const aggregations = require('./aggregations');
const { transformDate } = require('../../../helpers');

const getFullReportByMonth = async (_id, year, month, limit) => {
  const date = transformDate(year, month);

  if (!limit) limit = 1000;

  const result = await Transaction.aggregate(
    aggregations.fullReportAggregation(_id, Number(limit)),
  );

  const trimDateResult = result.map(item => {
    const indexEndDate = item.date.indexOf('T');
    const trimDate = item.date.substr(0, indexEndDate);
    item.date = trimDate;
    return {
      ...item,
      date: trimDate,
    };
  });

  const filterByDateResult = trimDateResult.filter(item => item.date === date);

  return date ? filterByDateResult : trimDateResult;
};

module.exports = getFullReportByMonth;
