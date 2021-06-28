'use strict';

// 顶点着色器
var vertexSource = `
  vec2 position = vec2(0.0, 0.0);
  
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = 100.0;
  }
`;

// 片元着色器
var fragmentSource = `
  void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
`;

main();

function main() {
  // 创建canvas画布
  var width = 500,
  height = 500,
  cvs = document.createElement('canvas'),
  // 获取webgl上下文
  gl = cvs.getContext('webgl2')
      || cvs.getContext('webgl')
      || cvs.getContext('experimental-webgl');

  if(!gl) {
  alert('您的浏览器不支持WebGL');
  }

  cvs.width = width;
  cvs.height = height;

  document.body.appendChild(cvs);

  const program = initShaderProgram(gl, vertexSource, fragmentSource);

  gl.viewport(0,0,width, height);
  gl.clearColor(1,0,0,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.drawArrays(gl.POINTS, 0,1);
}

