jest.mock('../config/get-config');

const RD = require('../utils/ramda-decimal');
const nationalInsurance = require('./national-insurance');
const getAllBands = require('../config/get-config');

const ALLOWANCE = 702;
const BASIC_CEILING = 3863;
const BASIC_RATE = 0.12;
const ADDITIONAL_RATE = 0.02;

const BANDS = [
  {
    startDate: '2017-04-06',
    bands: [
      {
        floor: 0,
        ceiling: 702,
        rate: 0,
      },
      {
        floor: 702,
        ceiling: 3863,
        rate: 0.12,
      },
      {
        floor: 3863,
        ceiling: null,
        rate: 0.12,
      },
    ],
  },
  {
    startDate: '2018-04-06',
    bands: [
      {
        floor: 0,
        ceiling: 702,
        rate: 0,
      },
      {
        floor: 702,
        ceiling: 3863,
        rate: 0.12,
      },
      {
        floor: 3863,
        ceiling: null,
        rate: 0.12,
      },
    ],
  },
  {
    startDate: '2019-04-06',
    bands: [
      {
        floor: 0,
        ceiling: ALLOWANCE,
        rate: 0,
      },
      {
        floor: ALLOWANCE,
        ceiling: BASIC_CEILING,
        rate: BASIC_RATE,
      },
      {
        floor: BASIC_CEILING,
        ceiling: Infinity,
        rate: ADDITIONAL_RATE,
      },
    ],
  },
];

const RUN_DATE = '2020-04-06';

describe('national-insurance', () => {
  getAllBands.mockReturnValue(BANDS);
  it.each([
    ['No NI on zero income', 0, '0.00'],
    ['No NI on income < allowance', ALLOWANCE - 1, '0.00'],
    ['No NI on income == allowance', ALLOWANCE, '0.00'],
    ['NI on income > allowance', ALLOWANCE + 1000, '120.00'],
    ['NI on income == max 12% amount', BASIC_CEILING, '379.32'],
    ['NI on income > max 12% amount', BASIC_CEILING + 1000, '399.32'],
  ])('%p', (message, grossIncome, expectedNi) => {
    const actual = nationalInsurance(RUN_DATE)(grossIncome);
    expect(actual.toFixed(2)).toEqual(expectedNi);
  });

  test('throws error', () => {
    const fn = () => nationalInsurance('2016-04-06')(ALLOWANCE);
    expect(fn).toThrow('National Insurance bands unavailable for date 2016-04-06');
  });
});

describe('bandsOnDate', () => {
  it.each([
    ['start of first band', '2017-04-06', BANDS[0]],
    ['middle of first band', '2017-12-06', BANDS[0]],
    ['end of first band', '2018-04-05', BANDS[0]],
    ['start of middle band', '2018-04-06', BANDS[1]],
    ['middle of middle band', '2018-12-06', BANDS[1]],
    ['end of middle band', '2019-04-05', BANDS[1]],
    ['start of middle band', '2019-04-06', BANDS[2]],
    ['middle of middle band', '2019-12-06', BANDS[2]],
    ['long into middle band', '2030-03-31', BANDS[2]],
  ])('%p', (message, runDate, expected) => {
    const actual = nationalInsurance.bandsOnDate(runDate, BANDS);
    expect(actual).toEqual(expected.bands);
  });
});

describe('slice', () => {
  it.each([
    ['zero when input == zero', 0, 5, 0, 0],
    ['number when within zero-floored range', 0, 5, 3, 3],
    ['number when input == ceiling', 0, 5, 5, 5],
    ['full slice when input > ceiling with zero floor', 0, 5, 6, 5],
    ['zero when input == floor', 5, 10, 5, 0],
    ['number when within nonzero-floored range', 5, 10, 6, 1],
    ['number when input == ceiling with nonzero floor', 5, 10, 10, 5],
    ['full slice when input > ceiling with nonzero floor', 5, 15, 18, 10],
    ['zero when input < floor', 5, 15, 4, 0],
  ])('%p', (message, floor, ceil, input, expected) => {
    const actual = nationalInsurance.slice(
      RD.decimal(floor),
      RD.decimal(ceil),
    )(RD.decimal(input));

    expect(actual).toEqual(RD.decimal(expected));
  });
});
