// import node modules
var request = require('request');
var fs = require('fs');
var notifier = require('node-notifier');
var path = require('path');
var schedule = require('node-schedule');
var wallpaper = require('wallpaper');

var util = require('./util');
var config = require('./config');
var userinfo = require('./userdata/userinfo');


var altBack = false;
var altBackObj = null;

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
            return;
        }
        console.log('Wallpapers for ' + util.getActiveDateString() +':');
        backgrounds = JSON.parse(body)['backgrounds'];
        backgrounds.some(function(background) {
            console.log(background);
            // check background is for today
            if (background.forDate == util.getActiveDateString()) {
                if (background.filename.startsWith("http")) {
                    // TODO: Sometimes local links are returned by momentum, no
                    // clean way of dealing with this.

                    var fileExt = background.filename.substr(background.filename.lastIndexOf('.') + 1);
                    var backgroundName = background.title.replace(/ /g,"_").replace(/,/g,"_") + '.' + fileExt;

                    // set background
                    util.download(background.filename, 'backgrounds/' + backgroundName, function() {
                        console.log('Download successful for ' + background.filename + '(' + background.title + ')');
                        wallpaper.set('./backgrounds/' + backgroundName);
                        // fire notification
                        notifier.notify({
                            title: 'Background changed',
                            message: background.title,
                            icon: path.join(__dirname, 'backgrounds/' + backgroundName),
                            sound: true
                        }, function (err, response) { });
                    });
                    return true;
                } else {
                    altBack = true;
                }
            } else {
                if (background.filename.startsWith("http")) {
                    altBackObj = background;
                    if (altBack == true) {
                        return true;
                    }
                }
            }
        });

        /* Set the alternate background if todays background did not work. */
        if (altBack == true && altBackObj != null) {
            var fileExt = altBackObj.filename.substr(altBackObj.filename.lastIndexOf('.') + 1);
            var backgroundName = altBackObj.title.replace(/ /g,"_").replace(/,/g,"_") + '.' + fileExt;

            // set background
            util.download(altBackObj.filename, 'backgrounds/' + backgroundName, function() {
                console.log('Download successful for ' + altBackObj.filename + '(' + altBackObj.title + ')');
                wallpaper.set('./backgrounds/' + backgroundName);
                // fire notification
                notifier.notify({
                    title: 'Background changed',
                    message: altBackObj.title,
                    icon: path.join(__dirname, 'backgrounds/' + backgroundName),
                    sound: true
                }, function (err, response) { });
            });
        }

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

