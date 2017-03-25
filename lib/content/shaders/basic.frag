#version 330 core

out vec4 color;

in VS_OUT {
  vec3 position;
  vec3 normal;
  vec2 texCoords;
} fs_in;

struct Material {
  sampler2D diffuseMap;
  int enableDiffuseMap;
  vec3 diffuse;
}; 

struct Light {
  vec3 direction;
  vec3 ambient;
  vec3 diffuse;
};

uniform Material material;
uniform Light light;

void main()
{
  vec3 surface = material.diffuse;
  if (material.enableDiffuseMap == 1) {
    surface = texture(material.diffuseMap, fs_in.texCoords).rgb;
  }

  // Ambient
  vec3 ambient = light.ambient * surface;

  // Diffuse 
  vec3 normal = normalize(fs_in.normal);
  vec3 lightDir = normalize(-light.direction);  
  float diff = max(dot(normal, lightDir), 0.0);
  vec3 diffuse = light.diffuse * diff * surface;

  color = vec4(ambient + diffuse, 1.0f);
}