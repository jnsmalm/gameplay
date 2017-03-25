#version 330 core

layout (location = 0) in vec3 position;
layout (location = 1) in vec2 texCoords;

out vec2 uv;

uniform mat4 viewProjection;

void main()
{
  uv = texCoords;
  gl_Position = viewProjection * vec4(position, 1.0);
}