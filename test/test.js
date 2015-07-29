var expect = require('chai').expect;
var HockeyApp = require('../index');

var rink = new HockeyApp({
  'apiToken': '3f3b68eeb0884577ab04faf202caa702'
  });
rink.listApps().then(function(results) {
  console.log(results);
}).catch(function(err) {
  throw err;
});
