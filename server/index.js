require('./env');

var express = require('express');
var app = express();

// https://scotch.io/tutorials/use-ejs-to-template-your-node-application
app.set('view engine', 'ejs');

// app.use('/static', express.static(__dirname + '/../public'));
app.use('/js', express.static(__dirname + '/../dist/js'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.listen(process.env.port);