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
import { Transform } from "./transform"
import { Vector2, Vector3, Matrix4 } from "./math"
import { VertexSpecification, VertexAttribute, PrimitiveType, BufferUsage } from "./vertex"
import { Component } from "./entity"
import { Model, MeshShader, Mesh, DiffuseMaterial } from "./mesh"

/**
 * Open Asset Import Library
 */
export module Assimp {
  /**
   * Creates a model from a assimp2json file.
   */
  export function createModelFromFile(
      filePath: string, shader: MeshShader<DiffuseMaterial>) {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    let reader = new AssimpReader(
      filePath.replace(/[^\/]*$/, ''), data, shader);
    let model = new Model(shader)
    model.meshes = reader.readNodeHierarchy(data.rootnode, model.transform);
    return model
  }
}

class AssimpReader {
  textures: { [filepath: string]: Texture2D } = {}

  constructor(private path: string, private data: any,
    private shader: MeshShader<DiffuseMaterial>) { }

  static readTransformation(transformation: number[]) {
    let matrix = new Matrix4()
    for (var i = 0; i < 16; i++) {
      matrix[i] = transformation[i]
    }
    return matrix.transpose(matrix)
  }

  readNodeHierarchy(node: any, 
      transform: Transform, transformation?: Matrix4): Mesh<DiffuseMaterial>[] {
    let meshes: Mesh<DiffuseMaterial>[] = []

    let nodeTransformation = 
      AssimpReader.readTransformation(node.transformation)
    if (transformation) {
      Matrix4.multiply(transformation, nodeTransformation, nodeTransformation)
    }
    transformation = nodeTransformation

    if (node.meshes) {
      for (var i = 0; i < node.meshes.length; i++) {
        let mesh = this.readMesh(
          this.data.meshes[node.meshes[i]], transformation)
        mesh.transform.parent = transform
        transform = mesh.transform
        meshes.push(mesh)
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        let meshChildren = this.readNodeHierarchy(
          node.children[i], transform, transformation)
        meshes.push(...meshChildren)
      }
    }
    return meshes
  }

  readMesh(data: any, transformation: Matrix4) {
    let mesh = new Mesh<DiffuseMaterial>(transformation)
    mesh.material = this.readMaterial(
      this.data.materials[data.materialindex])

    for (var i = 0; i < data.vertices.length; i += 3) {
      mesh.geometry.vertices.push(new Vector3(
        data.vertices[i], data.vertices[i + 1], data.vertices[i + 2]
      ))
    }
    for (var i = 0; i < data.normals.length; i += 3) {
      mesh.geometry.normals.push(new Vector3(
        data.normals[i], data.normals[i + 1], data.normals[i + 2]
      ))
    }
    for (var i = 0; i < data.texturecoords[0].length; i += 2) {
      mesh.geometry.texCoords.push(new Vector2(
        data.texturecoords[0][i], 1 - data.texturecoords[0][i + 1]
      ))
    }
    for (var i = 0; i < data.faces.length; i++) {
      mesh.geometry.triangles.push(...data.faces[i])
    }
    mesh.vertexSpec = this.shader.createVertexSpec(mesh.geometry)
    return mesh
  }

  readMaterial(data: any) {
    let material = new DiffuseMaterial()
    for (let i = 0; i < data.properties.length; i++) {
      let value = data.properties[i].value
      switch (data.properties[i].key) {
        case "$tex.file": {
          if (!this.textures[value]) {
            this.textures[value] = Texture2D.createFromFile(this.path + value)
          }
          switch (data.properties[i].semantic) {
            case 1: {
              material.diffuseMap = this.textures[value]
              break;
            }
          }
          break;
        }
        case "$clr.diffuse": {
          material.diffuse = new Vector3(value[0], value[1], value[2])
          break
        }
      }
    }
    return material
  }
}