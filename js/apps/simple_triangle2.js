// This example illustrates the use of Uniforms in frag shader
var util = require('./../util');
var shaderStore = require('./../shaders/store');
var math = require('gl-matrix');
var dat = require('./../vendor/dat.gui');

var canvas = util.buildCanvas(500, 500);
var gl = canvas.getContext('webgl');
var vertexShaderSource = shaderStore['simple_triangle.vert'];
var fragmentShaderSource = shaderStore['paint_color.frag'];

var program = util.buildGLProgram(gl, vertexShaderSource, fragmentShaderSource);

var guiColor = math.vec4.set(math.vec4.create(), 0, 0, 0, 1);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

var attrPosition = gl.getAttribLocation(program, 'a_Position'); // Getting vertex attr reference
gl.enableVertexAttribArray(attrPosition); // turn on getting data out of a buffer for this attribute
gl.vertexAttribPointer(attrPosition, 2, gl.FLOAT, false, 0, 0);

var uColor = gl.getUniformLocation(program, 'u_FragColor');
gl.uniform4fv(uColor, guiColor);

var triangleVec2Data = new Float32Array([
  0, 0,
  1, 0,
  0, 1
]);

gl.bufferData(gl.ARRAY_BUFFER, triangleVec2Data, gl.STATIC_DRAW); // geometry doesn't change much

util.makeVecGui(new dat.GUI(), guiColor, 3, 'Color', {open: true, min: 0, max: 1}, updateColor.bind(null, gl, uColor, guiColor));

function updateColor(glContext, glColor, jsColor) {
	if (!glContext) return;
  glContext.uniform4fv(glColor, jsColor);
  gl.drawArrays(gl.TRIANGLES,  0, 3); // 3 vec2s
}

updateColor(gl, uColor, guiColor);