#version 330 core

layout (location = 0) in vec3 position;
layout (location = 1) in float opacity;
layout (location = 2) in vec2 texCoords;

out VS_OUT {
  vec2 texCoords;
  float opacity;
} vs_out;

uniform mat4 viewProjection;

void main()
{
  vs_out.texCoords = texCoords;
  vs_out.opacity = opacity;
  gl_Position = viewProjection * vec4(position, 1.0);
}