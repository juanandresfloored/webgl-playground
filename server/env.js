if (process.env['_webgl-playground']) return;

var config = {
	'_webgl-playground': true,
  'port': '3000'
};

for (var prop in config) {
	process.env[prop] = config[prop];
}

return;