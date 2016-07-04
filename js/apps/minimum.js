var shaderStore = require('./../shaders/store');
var util = require('./../util');

var canvas = util.buildCanvas(400, 200);
var gl = canvas.getContext('webgl');

var vertexShaderSource = shaderStore['simple_point.vert'];
var fragmentShaderSource = shaderStore['paint_red.frag'];
util.buildGLProgram(gl, vertexShaderSource, fragmentShaderSource);

gl.drawArrays(gl.POINTS, 0, 1);