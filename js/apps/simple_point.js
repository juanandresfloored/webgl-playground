var dat = require('./../vendor/dat.gui');
var shaderStore = require('./../shaders/store');
var math = require('gl-matrix');
var util = require('./../util');

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

var canvas = util.buildCanvas(400, 200);
var gl = canvas.getContext('webgl');
var vertexShaderSource = shaderStore['simple_point.vert'];
var fragmentShaderSource = shaderStore['paint_red.frag'];
var program = util.buildGLProgram(gl, vertexShaderSource, fragmentShaderSource);
var a_Position = gl.getAttribLocation(program, 'a_Position');
makeVec2Gui(new dat.GUI(), guiPosition, 'Position', {open: true}, drawVec2.bind(null, gl, a_Position, guiPosition));
drawVec2(gl, a_Position, guiPosition);