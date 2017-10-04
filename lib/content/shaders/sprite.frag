#version 330 core

in VS_OUT {
  vec2 texCoords;
  vec4 color;
} fs_in;

out vec4 color;

uniform sampler2D tex0;

void main()
{
  color = texture(tex0, fs_in.texCoords) * fs_in.color;
}