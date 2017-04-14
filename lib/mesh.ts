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

import { Transform } from "./transform"
import { Vector2, Vector3, Matrix4 } from "./math"
import { VertexSpecification, PrimitiveType } from "./vertex"
import { Component } from "./entity"
import { Pool } from "./utils"

const matrix = new Pool(Matrix4, 5)

/**
 * Represents a shader used when drawing a mesh.
 */
export interface MeshShader<T> {
  setMaterial(material: T): void
  use(): void
  createVertexSpec(mesh: MeshGeometry): VertexSpecification
  setWorld(world: Matrix4): void
}

/**
 * Represents geometry that describe the shape of a 3D object.
 */
export class MeshGeometry {
  vertices: Vector3[] = []
  normals: Vector3[] = []
  texCoords: Vector2[] = []
  triangles: number[] = []
}

/**
 * Represents a mesh containing geometry that describes the 3d object.
 */
export class Mesh<T> {
  geometry = new MeshGeometry()
  transform = new Transform()
  vertexSpec: VertexSpecification
  material: T

  /**
   * Creates a new mesh.
   */
  constructor(public transformation = Matrix4.createIdentity()) { }

  /**
   * Returns the world matrix for the mesh.
   */
  getWorldMatrix(out = new Matrix4()) {
    return Matrix4.multiply(
      this.transformation, this.transform.getWorldMatrix(matrix.next()), out)
  }
}

export class Model<T> implements Component {
  transform = new Transform()
  meshes: Mesh<T>[] = []

  /**
   * Creates a new model.
   */
  constructor(public shader: MeshShader<T>) { }

  attach(transform: Transform) {
    this.transform.parent = transform
  }

  draw() {
    this.shader.use()
    for (let mesh of this.meshes) {
      this.shader.setWorld(mesh.getWorldMatrix(matrix.next()))
      this.shader.setMaterial(mesh.material)
      mesh.vertexSpec.drawIndexed(
        PrimitiveType.Triangles, mesh.geometry.triangles.length)
    }
  }
}