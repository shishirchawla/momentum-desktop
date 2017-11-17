// import node modules
var request = require('request');
var fs = require('fs');
var schedule = require('node-schedule');
var wallpaper = require('wallpaper');

var util = require('./util');
var config = require('./config');
var userinfo = require('./userdata/userinfo');

/* Sets desktop background to todays wallpaper. */
function setLatestBackground() {
    // make wallpaper request
    var wallpaperOptions = {
        uri: config.urlSync,
        headers: {
            'Authorization': 'Bearer ' + userinfo.logintoken.token
        },
        method: 'GET'
    };
    request(wallpaperOptions, function (error, response, body) {
        if (response.statusCode != 200) {
            // TODO: get new token
            console.log('error in getting wallpapers: access token may be out of date.');
            console.log(userinfo);
            return;
        }
        console.log('Wallpapers for ' + util.getActiveDateString() +':');
        backgrounds = JSON.parse(body)['backgrounds'];
        backgrounds.some(function(background) {
            console.log(background);
            // check background is for today
            if (background.forDate == util.getActiveDateString()) {
                // set backgorund
                util.download(background.filename, 'backgrounds/' + background.title, function() {
                    console.log('Download successful for ' + background.filename + '(' + background.title + ')');
                    wallpaper.set('./backgrounds/' + background.title);
                });
                return true;
            }
        });
    });
}

function main() {
    /* Get login token if does not exist. */
    if (!('logintoken' in userinfo)) {
        console.log('login token does not exist, requesting token...');
        var options = {
            uri: config.urlLogin,
            method: 'POST',
            json: {
                "username": userinfo.username,
                "password": userinfo.password
            }
        };
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            loginToken = JSON.stringify(body);
            userinfo.logintoken = JSON.parse(loginToken);
            fs.writeFile("./userdata/logintoken.json", loginToken, "utf8", setLatestBackground);
          }
        });
    } else {
        setLatestBackground();
    }
}

main();
schedule.scheduleJob({hour: 0, minute: 0}, () => {
    main();
});
