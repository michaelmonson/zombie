var winston = require('winston')
  , winstonMail = require('winston-mail')
  , winstonMongodb = require('winston-mongodb')
  , config = require('../config')
  , sms = require('sms-address');

var l = -1;
var levels = {
  silly: l++,
  verbose: l++,
  info: l++,
  debug: l++,
  warn: l++,
  error: l++,
  resistanceIsFutile: l++,
  somethingWickedThisWayComes: l++,
  TROGDOR: l++,
  itsJustAFleshWound: l++,
  inconceivable: l++,
  theKrakenHasBeenReleased: l++
};

var colors = {
  silly: 'rainbow',
  verbose: 'magenta',
  info: 'blue',
  debug: 'yellow',
  warn: 'red',
  error: 'red inverse',
  resistanceIsFutile: 'bold inverse underline red',
  somethingWickedThisWayComes: 'bold inverse underline red',
  TROGDOR: 'bold inverse underline red',
  itsJustAFleshWound: 'bold inverse underline red',
  inconceivable: 'bold inverse underline red',
  theKrakenHasBeenReleased: 'bold inverse underline red'
};

winston.addColors(colors);

var logger = new (winston.Logger)({
  levels: levels
});

var consoleLevel = (config.hasOwnProperty('log') ? config.log : 'info');
logger.add(winston.transports.Console, {
  level: consoleLevel,
  colorize: true
});

logger.add(winston.transports.MongoDB, {
  level: 'error',
  db: 'winston'
});

if (config.env !== 'local' && config.hasOwnProperty('contacts')) {
  // convert phone/carrier pair to email address
  var re = /\d?-?(\d{3}-\d{3}-\d{4}) (.*)/;
  var contacts = config.contacts.map(function(v) {
    if (matches = re.exec(v)) {
      return sms(matches[1], matches[2]);
    } else {
      return v;
    }
  });

  // add the mail transport for very bad errors
  logger.add(winston.transports.Mail, {
    level: 'resistanceIsFutile',
    from: 'something.bad.just.happened@ifit.com',
    to: contacts
  });
}

module.exports = logger;
