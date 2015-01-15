var Stomp = require('stomp-client');

Logger = function (options) {
  var name = options.name;

  var hostname = options.hostname;
  var port = options.port;
  var user = options.user;
  var password = options.password;

  this._destination = '/topic/' + options.name;
  this._connectRetryInterval = 5;

  console.log('Connecting to STOMP server.');
  console.log('Hostname: ' + hostname);
  console.log('Port: ' + port);
  console.log('User: ' + user);
  console.log('Password: ' + password);

  this._client = new Stomp(hostname, port, user, password);

  this.connect();
};

Logger.prototype.constructor = Logger;

Logger.prototype.connect = function () {
  var self = this;

  this._client.connect(function(sessionId) {
    console.log('Successfully connected to STOMP server');
  }, function (error) {
    console.log('Error connecting to STOMP server: ' + error);
    console.log('Retrying in ' + self._connectRetryInterval + ' seconds.');

    setTimeout(function () { self.connect(); }, self._connectRetryInterval * 1000);
  });
};

var levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

levels.forEach(function (level) {
  Logger.prototype[level] = function (message) {
    console.log(this._destination, level + ':' + ' ' + message);

    this._client.publish(this._destination, level + ':' + ' ' + message);
  };
});

var createLogger = function (options) {
  return new Logger(options);
};

module.exports.createLogger = createLogger;

