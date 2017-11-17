var userinfo = {};

userinfo.username = '{{username}}';
userinfo.password = '{{password}}';

try {
    userinfo.logintoken = require("./logintoken.json");
} catch (ex) {
    // do nothing, handle elsewhere
}

module.exports = userinfo;
