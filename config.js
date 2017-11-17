var util = require('./util');

var config = {};

config.urlRoot = 'https://api.momentumdash.com';
config.urlLogin = config.urlRoot + '/user/authenticate';
config.urlSync = 'https://api.momentumdash.com/feed/bulk?syncTypes=all&localDate=' + util.getActiveDateString();

module.exports = config;
