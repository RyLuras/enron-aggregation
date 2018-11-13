## Emails per day

```js
[
    //project: <--create a new -->date field and run it rhough this date to string function, formatting it in the way describes, and getting the data from the headers.date field
    { $project: { date: { $dateToString: { format: '%Y-%m-%d', date: '$headers.Date' } } } },

    //now we group by date, getting everything with the SAME date field and putting it into a single document, and then we start counting how mant results we get. we will have many documents, all with the emails that share the same date, and a count field denoting how mant emails there were that day.
    { $group: { _id: '$date', count: { $sum: 1 } } },

    //taking only from the previous group stage, now we are going to group everything together (id as null), and create a new field called min, max and avg, and run these functions of $min: and get the count field:'$count', ... and for max and avg.
    { $group: { _id: null, min: { $min: '$count' }, max: { $max: '$count' }, avg: { $avg: '$count' } } }
]
```

## Email recipients

```js
[
    { $unwind: '$headers.To' },
    { $project: { to: '$headers.To', day: { $dateToString: { format: '%Y-%m-%d', date: '$headers.Date' } } } },
    { $group: { _id: '$to', count: { $sum: 1 } } },
    { $sort: { 'count': -1 } }
]
```
