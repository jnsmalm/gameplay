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

import * as assimp from "gameplay/assimp"
import * as fs from "fs"
import * as path from "path"

import { Texture2D } from "./texture"
import { Transform } from "./transform"
import { Vector2, Vector3, Matrix4 } from "./math"
import { VertexSpecification, VertexAttribute, PrimitiveType, BufferUsage } from "./vertex"
import { Component } from "./entity"
import { Model, MeshShader, Mesh } from "./mesh"

/**
 * Default material used when reading from assimp2json
 */
export class AssimpMaterial {
  ambientColor = new Vector3(1, 1, 1)
  specularMap: Texture2D
  specularColor = new Vector3(1, 1, 1)
  normalMap: Texture2D
  heightMap: Texture2D
  diffuseMap: Texture2D
  diffuseColor = new Vector3(1, 1, 1)
}

export interface AssimpMaterialFactory<T> {
  create(material: AssimpMaterial): T
}

class DefaultAssimpMaterialFactory implements AssimpMaterialFactory<AssimpMaterial> {
  create(material: AssimpMaterial) {
    return material
  }
}

export enum AssimpPostProcessSteps {
  CalcTangentSpace = 0x1,
  JoinIdenticalVertices = 0x2,
  MakeLeftHanded = 0x4,
  Triangulate = 0x8,
  RemoveComponent = 0x10,
  GenNormals = 0x20,
  GenSmoothNormals = 0x40,
  SplitLargeMeshes = 0x80,
  PreTransformVertices = 0x100,
  LimitBoneWeights = 0x200,
  ValidateDataStructure = 0x400,
  ImproveCacheLocality = 0x800,
  RemoveRedundantMaterials = 0x1000,
  FixInfacingNormals = 0x2000,
  SortByPType = 0x8000,
  FindDegenerates = 0x10000,
  FindInvalidData = 0x20000,
  GenUVCoords = 0x40000,
  TransformUVCoords = 0x80000,
  FindInstances = 0x100000,
  OptimizeMeshes  = 0x200000,
  OptimizeGraph  = 0x400000,
  FlipUVs = 0x800000,
  FlipWindingOrder  = 0x1000000,
  SplitByBoneCount  = 0x2000000,
  Debone  = 0x4000000
}

/**
 * Open Asset Import Library
 */
export module Assimp {
  /**
   * Creates a model (with a custom material) from a file.
   * @param filePath The file path for the model.
   * @param shader The shader to use when drawing the model.
   * @param factory The factory to use when converting the assimp material to a custom material.
   */
  export function createModelFromFileCustomMaterial<T>(filePath: string, shader: MeshShader<T>, factory: AssimpMaterialFactory<T>, postProcessSteps?: AssimpPostProcessSteps) {
    let data: assimp.Scene
    if (path.extname(filePath) === ".json") {
      data = <assimp.Scene>JSON.parse(fs.readFileSync(filePath, "utf8"));
    } else {
      data = assimp.importFile(filePath, postProcessSteps)
    }
    if (!data) {
      throw new TypeError(`Failed to load ${filePath}`)
    }
    let reader = new AssimpReader<T>(
      filePath.replace(/[^\/]*$/, ''), data, shader, factory);
    let model = new Model<T>(shader)
    model.meshes = reader.readNodeHierarchy(data.rootNode, model.transform);
    return model
  }

  /**
   * Creates a model from a file.
   * @param filePath The file path for the model.
   * @param shader The shader to use when drawing the model.
   */
  export function createModelFromFile(filePath: string, shader: MeshShader<AssimpMaterial>, postProcessSteps?: AssimpPostProcessSteps) {
    return createModelFromFileCustomMaterial(
      filePath, shader, new DefaultAssimpMaterialFactory(), postProcessSteps)
  }
}

class AssimpReader<T> {
  textures: { [filepath: string]: Texture2D } = {}

  constructor(private path: string, private data: assimp.Scene,
    private shader: MeshShader<T>, private factory: AssimpMaterialFactory<T>) { }

  static readTransformation(transformation: number[]) {
    let matrix = new Matrix4()
    for (var i = 0; i < 16; i++) {
      matrix[i] = transformation[i]
    }
    return matrix.transpose(matrix)
  }

  readNodeHierarchy(node: assimp.Node, transform: Transform, transformation?: Matrix4): Mesh<T>[] {
    let meshes: Mesh<T>[] = []

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

  readMesh(data: assimp.Mesh, transformation: Matrix4) {
    let mesh = new Mesh<T>(transformation)
    mesh.material = this.readMaterial(this.data.materials[data.materialIndex])

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
    if (data.textureCoords) {
      for (var i = 0; i < data.textureCoords[0].length; i += 2) {
        mesh.geometry.texCoords.push(new Vector2(
          data.textureCoords[0][i], 1 - data.textureCoords[0][i + 1]
        ))
      }
    }
    for (var i = 0; i < data.faces.length; i++) {
      mesh.geometry.triangles.push(...data.faces[i])
    }
    mesh.vertexSpec = mesh.geometry.createVertexSpec(this.shader.input)
    return mesh
  }

  readMaterial(data: assimp.Material) {
    let material = new AssimpMaterial()
    for (let i = 0; i < data.properties.length; i++) {
      let value = data.properties[i].value
      switch (data.properties[i].key) {
        case "$tex.file": {
          if (!this.textures[value]) {
            try {
              this.textures[value] = Texture2D.createFromFile(this.path + value)
            } catch (err) {
              continue
            }
          }
          switch (data.properties[i].semantic) {
            case 1: {
              material.diffuseMap = this.textures[value]
              break;
            }
            case 2: {
              material.specularMap = this.textures[value]
              break;
            }
            case 5: {
              material.heightMap = this.textures[value]
              break;
            }
            case 6: {
              material.normalMap = this.textures[value]
              break;
            }
          }
          break;
        }
        case "$clr.diffuse": {
          let color = new Vector3(value[0], value[1], value[2])
          if (color.magnitude > 0) {
            material.diffuseColor = color
          }
          break
        }
        case "$clr.ambient": {
          let color = new Vector3(value[0], value[1], value[2])
          if (color.magnitude > 0) {
            material.ambientColor = color
          }
          break
        }
        case "$clr.specular": {
          let color = new Vector3(value[0], value[1], value[2])
          if (color.magnitude > 0) {
            material.specularColor = color
          }
          break
        }
      }
    }
    return this.factory.create(material)
  }
}