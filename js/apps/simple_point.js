var dat = require('./../vendor/dat.gui');
var shaderStore = require('./../shaders/store');
var math = require('gl-matrix');

var guiPosition = math.vec2.create();

function makeVec2Gui(gui, jsVec2, label, opts, onChangeFn) {
	if (!opts) opts = {};
	var controller = gui.addFolder(label);
	var min = opts.min ? opts.min : -1;
	var max = opts.max ? opts.max : 1;
	controller.add(jsVec2, '0', min, max).onChange(onChangeFn);
	controller.add(jsVec2, '1', min, max).onChange(onChangeFn);
	if (opts.open) controller.open();
}

function drawVec2(glContext, glVec2, jsVec2) {
	if (!glContext) return;
	glContext.vertexAttrib2fv(glVec2, jsVec2);
	glContext.drawArrays(glContext.POINTS, 0, 1);
}

function compileShader(shader) {
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    return false;
  }
  return true;
}
function buildCanvas(width, height) {
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas);
	return canvas;
}

function buildGLProgram(gl, vertexShaderSource, fragmentShaderSource) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderSource);
	gl.compileShader(vertexShader);
	compileShader(vertexShader);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderSource);
	compileShader(fragmentShader);

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.useProgram(program);

	return program;
}

var canvas = buildCanvas(400, 200);
var gl = canvas.getContext('webgl');
var vertexShaderSource = shaderStore['simple_point.vert'];
var fragmentShaderSource = shaderStore['paint_red.frag'];
var program = buildGLProgram(gl, vertexShaderSource, fragmentShaderSource);
var a_Position = gl.getAttribLocation(program, 'a_Position');
makeVec2Gui(new dat.GUI(), guiPosition, 'Position', {open: true}, drawVec2.bind(null, gl, a_Position, guiPosition));
drawVec2(gl, a_Position, guiPosition);