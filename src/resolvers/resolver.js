const account = require('./account');
const map = require('./map');
const { merge } = require('lodash');

module.exports = merge(
    account,
    map
);