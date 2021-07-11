const nationalInsurance = require('../services/national-insurance');

module.exports = (req, res) => {
  const runDate = req.headers['x-run-date'];
  res.send({
    income: req.income,
    ni: nationalInsurance(runDate)(req.income),
  });
};
