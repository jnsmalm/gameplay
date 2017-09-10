#version 330 core

in VS_OUT {
  vec2 texCoords;
  float opacity;
} fs_in;

out vec4 color;

uniform sampler2D tex0;

void main()
{
  color = texture(tex0, fs_in.texCoords);
  color.a *= fs_in.opacity;
}