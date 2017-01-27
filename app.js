var path = require('path');
var nunjucks = require('nunjucks');
var express = require('express');
var app = express();

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.use('/templates', express.static('templates'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});