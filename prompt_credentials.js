var prompt = require('prompt');
var fs = require('fs');
var handlebars = require('handlebars');

var schema = {
    properties: {
        'username (email)': { },
        'password': { hidden: true }
    }
};

/* Start prompt. */
prompt.start();

function success() {
    console.log("\n\n");
    console.log("user credentials successfully saved!");
    console.log("\n\nconfiguration:");
    console.log("next install forever by running the following command - ' npm install forever -g '");
    console.log("then start service by running - ' npm start . ', from the installed location.");
    console.log("\n\n\n");
}

/* Get username and password. */
console.log('please enter your momentum account details');
prompt.get(schema, function (err, result) {
    fs.readFile('./userdata/userinfo_template.js', {encoding: 'utf-8'}, function(err,data){
        var template = handlebars.compile(data);
        var credentials = { 'username' : result['username (email)'], 'password' : result.password };
        var userinfo = template(credentials);
        fs.writeFile("./userdata/userinfo.js", userinfo, "utf8", success);
    });
});
