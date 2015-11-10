function compileShader(gl, shader) {
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    return false;
  }
  return true;
}

function buildShaderFromSource(gl, type, source) {
  var vertexShader = gl.createShader(type);
  gl.shaderSource(vertexShader, source);
  compileShader(gl, vertexShader);
  return vertexShader;
}

function buildCanvas(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas;
}
function buildGLProgram(gl, vertexShaderSource, fragmentShaderSource) {

  var vertexShader = buildShaderFromSource(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = buildShaderFromSource(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  return program;
}

module.exports = {
  buildGLProgram: buildGLProgram,
  buildCanvas: buildCanvas
};