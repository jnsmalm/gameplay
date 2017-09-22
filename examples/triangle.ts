/*The MIT License (MIT)

Copyright (c) 2017 Jens Malmborg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

import * as $ from "gameplay/lib"

$.Game.init()

let vertex = new $.VertexSpecification([
  $.VertexAttribute.vec3,
  $.VertexAttribute.vec3
])

vertex.setVertexData(new Float32Array([
  -0.35,-0.5, 0.0, 1.0, 0.0, 0.0,
   0.35,-0.5, 0.0, 0.0, 1.0, 0.0,
   0.00, 0.5, 0.0, 0.0, 0.0, 1.0,
]))

let vs = `
#version 330 core

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 color;

out VS_OUT {
  vec3 color;
} vs_out;

void main() {
  gl_Position = vec4(position, 1.0f);
  vs_out.color = color;
}`

let fs = `
#version 330 core

out vec4 color;

in VS_OUT {
  vec3 color;
} fs_in;

void main() {
  color = vec4(fs_in.color, 1);
}`

let shader = new $.Shader(vs, fs)

$.Game.draw = () => {
  shader.use()
  vertex.draw($.PrimitiveType.Triangles, 3)
}
$.Game.run()