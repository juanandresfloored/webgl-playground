var util = require('./../util');
var shaderStore = require('./../shaders/store');

var canvas = util.buildCanvas(500, 500);
var gl = canvas.getContext('webgl');
var vertexShaderSource = shaderStore['simple_triangle.vert'];
var fragmentShaderSource = shaderStore['paint_red.frag'];

var program = util.buildGLProgram(gl, vertexShaderSource, fragmentShaderSource);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

var attrPosition = gl.getAttribLocation(program, 'a_Position'); // Getting vertex attr reference
gl.enableVertexAttribArray(attrPosition); // turn on getting data out of a buffer for this attribute
gl.vertexAttribPointer(attrPosition, 2, gl.FLOAT, false, 0, 0);

var triangleVec2Data = new Float32Array([
  0, 0,
  1, 0,
  0, 1
]);

gl.bufferData(gl.ARRAY_BUFFER, triangleVec2Data, gl.STATIC_DRAW); // geometry doesn't change much

gl.drawArrays(gl.TRIANGLES,  0, 3); // 3 vec2s