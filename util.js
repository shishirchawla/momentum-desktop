var request = require('request');
var fs = require('fs');

/* Utility functions taken from momentum plugin source. */
function getActiveDateString() {
    var t = new Date;
    //return activeDateStringForDate(e);
    return t.getFullYear().toString() + "-" + twoDigit(t.getMonth() + 1) + "-" + twoDigit(t.getDate());
}
function activeDateStringForDate(e) {
    var t = new Date(e);
    t.getHours() < 5 && (t = new Date(t.getTime() - 864e5));
    var i = t.getFullYear().toString() + "-" + twoDigit(t.getMonth() + 1) + "-" + twoDigit(t.getDate());
    return i;
}
function twoDigit(e) {
    var t = parseInt(e),
        i = t >= 10 ? t : "0" + t.toString();
    return i.toString();
}

/* Utility function for downloading a file. */
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

module.exports = {
  getActiveDateString: getActiveDateString,
  download: download
};
