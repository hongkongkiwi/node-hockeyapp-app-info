var request = require('request');
var log = require('debug')('hockeyapp');
var urlLog = require('debug')('hockeyapp::url');
var resultsLog = require('debug')('hockeyapp::results');
var _ = require('underscore');
var makeUrl = require('make-url');

/*http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching
https://itunes.apple.com/lookup?id=968261465*/

function HockeyApp(options) {
  options = _.extend({
    apiEndPoint: 'https://rink.hockeyapp.net/api/2',
    apiToken: "",
  }, options);
  this.Promise = require("bluebird");
  this.options = options;

  this._request = function(url) {
    return new this.Promise(function(resolve, reject) {
      request({
          headers: {
            'X-HockeyAppToken': options.apiToken
          },
          url: url,
          json: true
        }, function(err, response, body) {
          if (err) {
            reject(err);
          } else {
            resultsLog(body);
            resolve(body);
          }
      });
    });
  }
}

/*iTunes.prototype._sanitize = function(type, params) {
  var returnObj = {};
  if (typeof params !== 'object') {
    return {};
  }
  return _.extend(_.pick(params, this.options.allowedParams[type]), this.options.defaults);
}*/

/*HockeyApp.prototype._request = function(endPoint, params) {
  var url = require('url').parse(endPoint + '?' + require('querystring').stringify(params));
  urlLog(url.href);
  return new this.Promise(function(resolve, reject) {
    request({
        url: url.href
      }, function(err, response, body) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}*/


/** Apps **/
HockeyApp.prototype.uploadApp = function(params) {

  /*ipa - required, file data of the .ipa for iOS, .app.zip for OS X, or .apk file for Android
  dsym - optional, file data of the .dSYM.zip file (iOS and OS X) or mapping.txt (Android); note that the extension has to be .dsym.zip (case-insensitive) for iOS and OS X and the file name has to be mapping.txt for Android.
  notes - optional, release notes as Textile or Markdown
  notes_type - optional, type of release notes:
  0 for Textile
  1 for Markdown
  notify - optional, notify testers (can only be set with full-access tokens):
  0 to not notify testers
  1 to notify all testers that can install this app
  2 - Notify all testers
  status - optional, download status (can only be set with full-access tokens):
  1 to not allow users to download the version
  2 to make the version available for download
  tags - optional, restrict download to comma-separated list of tags
  teams - optional, restrict download to comma-separated list of team IDs; example:
  teams=12,23,42 with 12, 23, and 42 being the database IDs of your teams
  users - optional, restrict download to comma-separated list of user IDs; example:
  users=1224,5678 with 1224 and 5678 being the database IDs of your users
  mandatory - optional, set version as mandatory:
  0 for not mandatory
  1 for mandatory
  release_type - optional, set the release type of the app:
  2 for alpha
  0 for beta [default]
  1 for store
  3 for enterprise
  private - optional, set to true to enable the private download page (default is false)
  commit_sha - optional, set to the git commit sha for this build
  build_server_url - optional, set to the URL of the build job on your build server
  repository_url - optional, set to your source repository*/

  var url = this.options.apiEndPoint + makeUrl('/apps', params);
  urlLog(url);
  return this._request(url);
}

/*HockeyApp.prototype.createApp = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.deleteApp = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

*/
HockeyApp.prototype.listApps = function() {
  var url = this.options.apiEndPoint + '/apps';
  urlLog(url);
  return this._request(url);
}

/** Versions **/
HockeyApp.prototype.listVersions = function(publicId) {
  var url = this.options.apiEndPoint + makeUrl('/apps/:appId/app_versions', publicId);
  urlLog(url);
  return this._request(url);
}

/*HockeyApp.prototype.uploadVersion = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.createVersion = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.updateVersion = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.deleteVersion = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.deleteMultipleVersions = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

/** Invites **/
/*HockeyApp.prototype.listInvites = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.acceptInvite = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.rejectInvite = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

/** Teams & App Users **/
/*HockeyApp.prototype.listTeams = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.listAppTeams = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.listAppUsers = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.addAppTeam = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.removeAppTeam = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.inviteAppUser = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}

HockeyApp.prototype.removeAppUser = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}


HockeyApp.prototype.updateUser = function(params) {
  return this._request(this.options.searchApiEndPoint, _.extend(this._sanitize('search', params), {media: 'software'}));
}*/

// As we want to use the spread function, we set it on any third party promise that's attached
Object.defineProperty(this, 'Promise', { set: function(newPromise) {
    this.Promise = newPromise;
    if (!this.Promise.prototype.spread) {
        this.Promise.prototype.spread = function (fn) {
            return this.then(function (args) {
                return this.Promise.all(args); // wait for all
            }).then(function(args){
             //this is always undefined in A+ complaint, but just in case
                return fn.apply(this, args);
            });

        };
    }
  }
});

module.exports = HockeyApp;
