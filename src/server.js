const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const helmet = require('helmet');
const nocache = require('nocache');
const handlebars = require('express-handlebars');

const routes = require('./routes');

const app = express();

app.engine('html', handlebars({
  helpers: {
    toJson: (object) => JSON.stringify(object),
  },
}));
app.set('view engine', 'html');

app.use(responseTime());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(nocache());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.get('/ping', (req, res) => res.json({
  version: process.env.npm_package_version,
  name: process.env.npm_package_name,
}));

app.use(routes());

module.exports = app;
