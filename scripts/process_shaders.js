var fs = require('fs');
var path = require('path');
var async = require('async');

var SHADERS_STORE = {};

var shadersDir = __dirname + '/../js/shaders/';
var files = fs.readdirSync(shadersDir);

function processChunk(out, data) {
  var start = 0;
  var text = out.lastLine + data;

  while (true) {
    // execute incremental search over String.split()
    var linefeed = text.indexOf('\n', start);
    if (linefeed < 0) {
      // if \n not found, return last line
      out.lastLine = text.substring(start);
      return;
    }

    var line = text.substring(start, linefeed);
    out.text += (line + '\n');

    // iteration step
    start = linefeed + 1;
  }
}

function processShader(fileName, next) {
  var extname = path.extname(fileName);
  if (extname !== '.vert' && extname !== '.frag') return next();
  var readStream = fs.createReadStream(shadersDir + fileName, {flags: 'r', autoClose: true});
  var result = {text: '', lastLine: ''};

  readStream
    .on('data', processChunk.bind(null, result))
    .on('end', function() {
      SHADERS_STORE[fileName] = result.text + result.lastLine;
      next();
    });
}

async.eachLimit(files, 5, processShader, function(err) {
  if (err) {
    console.log(err);
    return process.exit(1);
  }

  fs.writeFileSync(shadersDir + 'store.js', 'module.exports = ' + JSON.stringify(SHADERS_STORE) + ';');
  process.exit(0);
});