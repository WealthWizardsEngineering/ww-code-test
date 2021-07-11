const axios = require('axios');

const BASE_URL = 'http://localhost:8080/v1/';

const DEFAULT_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getNIContributions = async (income, runDate) => {
  const config = DEFAULT_CONFIG;
  if (runDate && runDate !== 'undefined') {
    config.headers['x-run-date'] = runDate;
  }

  const payload = {
    income,
  };

  const url = `${BASE_URL}/national-insurance`;
  const response = await axios.post(url, payload, config);
  return response;
};

export default getNIContributions;
