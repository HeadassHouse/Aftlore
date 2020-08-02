const { merge } = require('lodash');
const account = require('./account');
const map = require('./map');
const campaign = require('./campaign');

module.exports = merge(
  account,
  map,
  campaign,
);
