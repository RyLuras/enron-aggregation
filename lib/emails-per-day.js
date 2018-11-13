module.exports = [
    { $project: { date: { $dateToString: { format: '%Y-%m-%d', date: '$headers.Date' } } } },
    { $group: { _id: '$date', count: { $sum: 1 } } },
    { $group: { _id: null, min: { $min: '$count' }, max: { $max: '$count' }, avg: { $avg: '$count' } } }
];
