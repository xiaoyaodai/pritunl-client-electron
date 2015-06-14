var request = require('request');
var alert = require('./alert.js');

var Service = function Service() {
  this.onUpdate = null;
};

Service.prototype.update = function() {
  request.get({
    url: 'http://localhost:9770/profile'
  }, function(err, resp, body) {
    this.onUpdate(JSON.parse(body));
  }.bind(this));
};

Service.prototype.start = function(prfl) {
  request.post({
    url: 'http://localhost:9770/profile',
    json: true,
    body: {
      id: prfl.id,
      data: prfl.data
    }
  }, function(err) {
    if (err) {
      alert.error('Failed to start profile: ' + err);
    }
  });
};

Service.prototype.stop = function(prfl) {
  console.log(prfl.id);

  request.del({
    url: 'http://localhost:9770/profile',
    json: true,
    body: {
      id: prfl.id
    }
  }, function(err) {
    if (err) {
      alert.error('Failed to stop profile: ' + err);
    }
  });
};

module.exports = {
  Service: Service
};
