const reportAmountByMonth = (id, type, limit) => [
  {
    $match: {
      owner: id,
      type: type,
    },
  },
  {
    $project: {
      _id: 1,
      value: 1,
      type: 1,
      date: {
        $dateFromString: { dateString: '$date' },
      },
    },
  },
  {
    $group: {
      _id: {
        year: { $year: '$date' },
        month: { $month: '$date' },
        type: '$type',
      },
      totalSum: { $sum: '$value' },
    },
  },

  {
    $project: {
      _id: 1,
      date: {
        $toString: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
          },
        },
      },
      totalSum: 1,
    },
  },
  {
    $sort: {
      date: -1,
    },
  },
  { $limit: limit },
];

module.exports = reportAmountByMonth;
