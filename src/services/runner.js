const R = require('ramda');
const RD = require('../utils/ramda-decimal');
const target = require('./national-insurance');

const RUNDATE = '2020-04-06';
const grossIncome = 700;

// console.log('gross income:', grossIncome);
// const output = target(RUNDATE)(grossIncome);
// console.log('output', output);

const floor = 5;
const ceil = 10;
const input = 6;
const expected = 1;

const actual = target.slice(
  RD.decimal(floor),
  RD.decimal(ceil),
)(RD.decimal(input));

// const output = target.slice(5, 10, 6);
console.log('result', actual);
console.log('expected', expected);
