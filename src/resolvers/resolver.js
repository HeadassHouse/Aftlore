const account = require('./account');
const map = require('./map');
const campaign = require('./campaign');
const { merge } = require('lodash');

module.exports = merge(
    account,
    map,
    campaign
);