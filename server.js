'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

app.use(function(req, res, next){
  res.renderHTML = function(file){
    res.sendFile(path.resolve(__dirname, './public/' + file + '.html'));
  };
});

app.get('*', function(req, res) {
  res.renderHTML('index');
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
