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

import * as fs from "fs"

import { Texture2D } from "./texture"
import { Vector2, Vector3, Matrix4 } from "./math"
import { VertexSpecification, VertexAttribute, BufferUsage } from "./vertex"
import { Shader } from "./shader"
import { Mesh, MeshMaterial, MeshShader, MeshGeometry } from "./mesh"
import { Camera } from "./camera"

export class DiffuseMaterial implements MeshMaterial {
  diffuseMap: Texture2D
  diffuse: Vector3

  /**
   * Creates a new diffuse material,
   */
  constructor(public shader: MeshShader<DiffuseMaterial>) { }

  use() {
    this.shader.setMaterial(this)
  }
}

export class DiffuseShader extends Shader implements MeshShader<DiffuseMaterial> {
  constructor() {
    super(
      fs.readFileSync(__dirname + "/content/shaders/basic.vert", "utf8"),
      fs.readFileSync(__dirname + "/content/shaders/basic.frag", "utf8"))
    this.use()
    this.uniform["light.diffuse"] = [1, 1, 1]
    this.uniform["light.direction"] = [-1, -1, -1]
    this.uniform["light.ambient"] = [0.3, 0.3, 0.3]
  }

  setMaterial(material: DiffuseMaterial) {
    if (material.diffuseMap) {
      this.uniform["material.enableDiffuseMap"] = 1
      material.diffuseMap.use()
    } else {
      this.uniform["material.enableDiffuseMap"] = 0
    }
    this.uniform["material.diffuse"] = material.diffuse
  }

  setWorldMatrix(world: Matrix4) {
    this.uniform["model"] = world
  }

  updateCamera(camera: Camera) {
    this.setView(camera.getView())
    this.setProjection(camera.getProjection())
  }

  setProjection(projection: Matrix4) {
    this.uniform["projection"] = projection
  }

  setView(view: Matrix4) {
    this.uniform["view"] = view
  }
  
  createVertexSpec(mesh: MeshGeometry) {
    let vertexSpec = new VertexSpecification([
      VertexAttribute.vec3, VertexAttribute.vec3, VertexAttribute.vec2
    ]);
    let vertices = new Float32Array(mesh.vertices.length * 8)
    for (let i = 0; i < mesh.vertices.length; i++) {
      vertices.set(mesh.vertices[i], i * 8 + 0)
      vertices.set(mesh.normals ?
        mesh.normals[i] : [0, 0, 0], i * 8 + 3)
      vertices.set(mesh.texCoords.length > 0 ?
        mesh.texCoords[i] : [0, 0], i * 8 + 6)
    }
    vertexSpec.setIndexData(
      new Uint32Array(mesh.triangles), BufferUsage.Static)
    vertexSpec.setVertexData(vertices, BufferUsage.Static)
    return vertexSpec
  }
}