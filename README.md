This is a node.js logging module that sends its log messages to a STOMP server, such as ActiveMQ or
RabbitMQ.

```javascript
var logger = require('log-stomp');

var log = logger.createLogger({name: 'stompQueueName', hostname: messageBroker,
  port: 61613, user: 'admin', password: 'admin'});

log.info('this is an info log message');
log.error('this is an error log message');
```

TODO:

* Filter logs by level.
