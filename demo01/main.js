'use strict';

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
// 设置webgl的渲染区域
gl.viewport(0,0,width, height);

document.body.appendChild(cvs);

gl.clearColor(1,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 顶点着色器
var vertexSource = `
  vec2 position = vec2(-1.0, -1.0); // 相当于vec2(0.0,0.0)
  
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

// 初始化顶点着色器
var vertexShader = gl.createShader(gl.VERTEX_SHADER); // 创建一个顶点着色器对象
  gl.shaderSource(vertexShader, vertexSource); // 配置顶点着色器
  gl.compileShader(vertexShader); // 编译顶点着色器，编译成二进制数据

// 检测一下顶点着色器是否编译正确
if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  throw gl.getShaderInfoLog(vertexShader);
}

// 初始化片元着色器
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); // 创建一个片元着色器对象
  gl.shaderSource(fragmentShader, fragmentSource); // 配置片元着色器
  gl.compileShader(fragmentShader); // 编译片元着色器，编译成二进制数据

// 检测一下片元着色器是否编译正确
if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  throw gl.getShaderInfoLog(fragmentShader);
}

// 初始化程序
var program = gl.createProgram(); // 创建和初始化一个 WebGLProgram 对象。
  // 添加预先定义好的顶点着色器和片段着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 链接给定的WebGLProgram，从而完成为程序的片元和顶点着色器准备GPU代码的过程。
  gl.linkProgram(program);

// 检测一下程序是否连接正确
if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw gl.getShaderInfoLog(program);
}

// 将定义好的WebGLProgram 对象添加到当前的渲染状态中。
gl.useProgram(program);

gl.drawArrays(gl.POINTS, 0,1);