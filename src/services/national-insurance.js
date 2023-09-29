const R = require('ramda');
const moment = require('moment');
const getAllBands = require('../config/get-config');
const RD = require('../utils/ramda-decimal');

const isDateOnOrAfter = R.curry(
  (date, dateString) => moment.utc(dateString, 'YYYY-MM-DD')
    .isSameOrBefore(date),
);

const noBandsError = (date) => new Error(`National Insurance bands unavailable for date ${date}`);

const bandsOnDate = (date, bands) => {
  const month = moment.utc(date, 'YYYY-MM-DD');

  return R.compose(
    R.when(R.isNil, () => {
      throw noBandsError(date);
    }),
    R.prop('bands'),
    R.last,
    R.filter(R.propSatisfies(isDateOnOrAfter(month), 'startDate')),
  )(bands);
};

// TODO this should do more than return the number it's given
const slice = R.curry((floor, ceiling, num) => num);

const calcForBand = R.curry(
  (income, { floor, ceiling, rate }) => RD.multiply(
    slice(floor, ceiling, income),
    rate,
  ),
);

module.exports = (runDate) => {
  const allBands = getAllBands();
  const bands = bandsOnDate(runDate || moment.utc(), allBands);
  return R.compose(
    RD.sum,
    R.flip(R.map)(bands),
    calcForBand,
  );
};

// for unit tests
module.exports.bandsOnDate = bandsOnDate;
module.exports.slice = slice;
