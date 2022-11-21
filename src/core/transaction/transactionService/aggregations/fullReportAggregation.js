const fullReportAggregation = (id, limit) => [
  {
    $match: {
      owner: id,
    },
  },
  {
    $project: {
      _id: 1,
      description: 1,
      type: 1,
      category: 1,
      value: 1,
      date: {
        $dateFromString: {
          dateString: '$date',
        },
      },
    },
  },
  {
    $group: {
      _id: {
        year: {
          $year: '$date',
        },
        month: {
          $month: '$date',
        },
        type: '$type',
        category: '$category',
        description: {
          $toLower: '$description',
        },
        value: '$value',
      },
      arrOfValues: {
        $push: '$value',
      },
    },
  },
  {
    $project: {
      date: {
        $toString: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
          },
        },
      },
      type: '$_id.type',
      category: '$_id.category',
      description: '$_id.description',
      value: {
        $sum: '$arrOfValues',
      },
    },
  },
  {
    $group: {
      _id: {
        date: '$date',
        type: '$type',
        category: '$category',
        description: {
          $toLower: '$description',
        },
      },
      arrOfDescription: {
        $push: {
          description: {
            $toLower: '$description',
          },
          value: '$value',
        },
      },
    },
  },
  {
    $project: {
      date: '$_id.date',
      type: '$_id.type',
      category: '$_id.category',
      description: '$_id.description',
      value: {
        $sum: '$arrOfDescription.value',
      },
    },
  },
  {
    $sort: {
      value: -1,
    },
  },
  {
    $group: {
      _id: {
        date: '$date',
        type: '$type',
        category: '$category',
      },
      arrOfTransactions: {
        $push: {
          description: {
            $toLower: '$description',
          },
          value: '$value',
        },
      },
    },
  },
  {
    $project: {
      date: '$_id.date',
      type: '$_id.type',
      category: '$_id.category',
      totalSum: {
        $sum: '$arrOfTransactions.value',
      },
      arrOfTransactions: '$arrOfTransactions',
    },
  },
  {
    $sort: {
      totalSum: -1,
    },
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'category',
      foreignField: '_id',
      as: 'category',
    },
  },
  {
    $unwind: {
      path: '$category',
    },
  },
  {
    $group: {
      _id: {
        date: '$date',
        type: '$type',
      },
      arrOfCategories: {
        $push: {
          category: {
            _id: '$category._id',
            name: '$category.name',
            type: '$category.type',
          },
          totalSum: '$totalSum',
          arrOfTransactions: '$arrOfTransactions',
        },
      },
    },
  },
  {
    $project: {
      date: '$_id.date',
      type: '$_id.type',
      arrOfCategories: '$arrOfCategories',
    },
  },
  {
    $group: {
      _id: {
        date: '$date',
      },
      arrOfTypes: {
        $push: {
          type: '$type',
          totalSum: {
            $sum: '$arrOfCategories.totalSum',
          },
          arrOfCategories: '$arrOfCategories',
        },
      },
    },
  },
  {
    $sort: {
      type: -1,
    },
  },
  {
    $project: {
      _id: 0,
      date: '$_id.date',
      arrOfTypes: '$arrOfTypes',
    },
  },
  {
    $sort: {
      date: -1,
    },
  },
  { $limit: limit },
];
module.exports = fullReportAggregation;
