/*# Graphics*/

import * as $ from "gameplay/lib"

/*At it's core, Gameplay.js uses OpenGL for drawing graphics. On top of the 
lower level API's found in OpenGL, Gameplay.js has it's own (higher level) 
functionality for drawing graphics which are more easy to use.*/

/*To explain the concepts involved when drawing something on screen, we'll go 
through the steps needed to draw a single triangle. Even though you rarely want 
to draw just a single triangle on screen in a real application, everything here 
can be applied when drawing more advanced graphics.

Before creating any graphic objects, we need to have a graphic context. 
Initializing the game will set up what we need.*/

$.Game.init()

/*## Vertex Specification

> Vertex Specification is the process of setting up the necessary objects for 
rendering with a particular shader program, as well as the process of using 
those objects to render.

When creating a vertex specification, the attributes and layout of the vertex 
data needs to be specified. In this case, we want each vertex in the triangle 
to have a position and color. Both position and color will be defined as vec3 
because both have three elements in them: position (x, y, z) and color 
(r, g, b).*/

let vertexSpec = new $.VertexSpecification([
  $.VertexAttribute.vec3,
  $.VertexAttribute.vec3
])

/*## Vertex Data

Vertex data is specified as an array of floats. The order of the vertex data 
elements matches the layout of the vertex specification attributes. The 
triangle contains of three vertices, each with a position (x, y, z) and color 
(r, g, b). In total, our vertex data array contains 18 elements.*/

// Layout: x, y, z, r, g, b
vertexSpec.setVertexData(new Float32Array([
  -0.35,-0.5, 0.0, 1.0, 0.0, 0.0,
   0.35,-0.5, 0.0, 0.0, 1.0, 0.0,
   0.00, 0.5, 0.0, 0.0, 0.0, 1.0
]))

/*## Shader

The shader is used for controlling how the vertex data will be drawn. A shader 
is created using two parts: vertex shader and fragment shader. Shaders are 
written using their own programming language called GLSL (OpenGL Shading 
Language). Writing shader-code is nothing specific to Gameplay.js, for a more 
general understanding of GLSL, visit https://open.gl/drawing

Note that the layout in the vertex shader (below) matches the elements defined 
in the vertex specification (above).*/

/**Vertex shader**/
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

/**Fragment shader**/
let fs = `
#version 330 core

out vec4 color;

in VS_OUT {
  vec3 color;
} fs_in;

uniform float opacity = 1;

void main() {
  color = vec4(fs_in.color, opacity);
}`

/*Create the shader using the vertex/fragment codes. You could also have the 
vertex -and fragment shaders in separate files and create the shader using 
`Shader.createFromFile()`.*/

let shader = new $.Shader(vs, fs)

/*To be able to draw with the shader you must use it.*/

shader.use()

/*## Drawing the triangle

Now everything has been set up to actually draw the triangle. We tell the 
`VertexSpecification` to draw a triangle with three vertices.*/

$.Game.draw = () => {
  vertexSpec.draw($.PrimitiveType.Triangles, 3)
}

/*## Uniforms

A uniform is a global GLSL variable that act as a parameter that the user of a 
shader program can pass to that program. The fragment shader (above) has a 
uniform defined with `uniform float opacity`. We can control the opacity of the 
triangle by checking for keyboard input and changing the uniform variable.*/

let opacity = 1
$.Game.update = () => {
  if ($.Game.keyboard.isKeyDown($.KeyCode.Up)) {
    opacity = Math.min(1, opacity + 0.025)
  }
  if ($.Game.keyboard.isKeyDown($.KeyCode.Down)) {
    opacity = Math.max(0, opacity - 0.025)
  }
  shader.uniform["opacity"] = opacity
}
