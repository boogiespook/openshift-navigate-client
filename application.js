var express = require('express');
var path = require('path');
var app = express();
var local = require('./environments/local');
var dev = require('./environments/dev');
var test = require('./environments/test');
var prod = require('./environments/prod');

// Define the port to run on
app.set('port', 8005);

app.get('/init', function (req, res) {
  console.log('Called /init route');

  if (!process.env.ENVIRONMENT) {
    console.log('No environment set, returning local config');
    res.status(200).send(local.get());
  }
  else if (process.env.ENVIRONMENT === 'DEV') {
    console.log('Returning DEV config');
    res.status(200).send(dev.get());
  }
  else if (process.env.ENVIRONMENT === 'TEST') {
    console.log('Returning TEST config');
    res.status(200).send(test.get());
  }
  else if (process.env.ENVIRONMENT === 'PROD') {
    console.log('Returning PROD config');
    res.status(200).send(prod.get());
  }
});

app.use(express.static(path.join(__dirname, 'build')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Serving Files on ' + port);
});