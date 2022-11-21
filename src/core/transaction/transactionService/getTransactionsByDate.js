const { Transaction } = require('../transactionModel');

const findTransactions = param => {
  const { id, date, type, skip, limit } = param;
  if (type) {
    return Transaction.find(
      {
        owner: id,
        date,
        type,
      },
      '-updatedAt',
      {
        skip,
        limit: Number(limit),
      },
    ).populate('category', 'name');
  } else {
    return Transaction.find(
      {
        owner: id,
        date,
      },
      '-updatedAt',
      {
        skip,
        limit: Number(limit),
      },
    ).populate('category', 'name');
  }
};

module.exports = findTransactions;
