var dat = require('./../vendor/dat.gui');
var shaderStore = require('./../shaders/store');
var math = require('gl-matrix');
var util = require('./../util');

var guiPosition = math.vec2.create();

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
util.makeVecGui(new dat.GUI(), guiPosition, 2, 'Position', {open: true}, drawVec2.bind(null, gl, a_Position, guiPosition));
drawVec2(gl, a_Position, guiPosition);