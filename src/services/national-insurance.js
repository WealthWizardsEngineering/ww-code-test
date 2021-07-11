const R = require('ramda');
const moment = require('moment');
const RD = require('../utils/ramda-decimal');

const allBands = require('../config/ni');

//
const isDateOnOrAfter = R.curry(
  (date, dateString) => moment.utc(dateString, 'YYYY-MM-DD')
    .isSameOrBefore(date), // this might be fishy
);

const noBandsError = (date) => new Error(`National Insurance bands unavailable for date ${date}`);

// Takes date,
// Filters ni config for dates on or after startDate
// Gets last element of list
// Gets 'bands' - array of objects
// throws error is no values for bands
const bandsOnDate = (date) => {
  const month = moment.utc(date, 'YYYY-MM-DD');

  return R.compose(
    R.when(R.isNil, () => {
      throw noBandsError(date);
    }),
    R.prop('bands'),
    R.last,
    R.filter(R.propSatisfies(isDateOnOrAfter(month), 'startDate')),
  )(allBands);
};

const slice = R.curry((floor, ceiling, num) => {
  // Function returns the amount of the number that is between the floor and ceiling boundaries
  let output;

  if (R.isNil(num) || (RD.lte(num, floor))) output = 0;
  else if (RD.gte(num, ceiling)) output = ceiling - floor;
  else output = num - floor;

  return RD.decimal(output);
});

const calcForBand = R.curry(
  (income, { floor, ceiling, rate }) => RD.multiply(
    slice(floor, ceiling, income),
    rate,
  ),
);

// bandsOnDate() // gets ni bands for given date or NOW
// calcForBand function
module.exports = (runDate) => {
  const bands = bandsOnDate(runDate || moment.utc());
  console.log('bands', bands);

  // Output before sum
  console.log(R.compose(
    R.flip(R.map)(bands),
    calcForBand,
  )(700));

  return R.compose(
    RD.sum,
    R.flip(R.map)(bands),
    calcForBand,
  );
};

// bandsOnDate() // gets ni bands for
// R.flip() reverses the ordering of first two args,
// R.map() takes a function and applies this function to each of the functor values and returns the functor in the same shape
// R.compose() right to left function composition (will run right most function first, then feed the output to the next left function)

// for unit tests
module.exports.bandsOnDate = bandsOnDate;
module.exports.slice = slice;
