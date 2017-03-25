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

import * as gl from "gameplay/opengl"

/** Defines a attribute of a vertex. */
export class VertexAttribute {
  constructor(public size: number, public stride: number) {
  }
  static get float() {
    return new VertexAttribute(1, 4)
  }
  static get vec2() {
    return new VertexAttribute(2, 8)
  }
  static get vec3() {
    return new VertexAttribute(3, 12)
  }
  static get vec4() {
    return new VertexAttribute(4, 16)
  }
  static get mat4() {
    return new VertexAttribute(16, 64)
  }
}

export enum PrimitiveType {
  Triangles = gl.TRIANGLES,
  Points = gl.POINTS,
  TriangleStrip = gl.TRIANGLE_STRIP,
  Lines = gl.LINES
}

export enum BufferUsage {
  Static = gl.STATIC_DRAW,
  Dynamic = gl.DYNAMIC_DRAW,
  Stream = gl.STREAM_DRAW
}

/**
 * Vertex Specification is the process of setting up the necessary objects
 * for rendering with a particular shader program, as well as the process of
 * using those objects to render.
 */
export class VertexSpecification {
  readonly elementBuffer: number
  readonly vertexArray: number
  readonly vertexBuffer: number

  /** Creates a new vertex specification. */
  constructor(attributes: VertexAttribute[]) {
    this.vertexArray = gl.createVertexArray()
    gl.bindVertexArray(this.vertexArray)

    this.vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    this.elementBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer)
    
    let stride = 0
    for (let attr of attributes) {
      stride += attr.stride
    }
    let location = 0
    let offset = 0
    for (let attr of attributes) {
      gl.enableVertexAttribArray(location)
      gl.vertexAttribPointer(
          location, attr.size, gl.FLOAT, false, stride, offset)
      location++
      offset += attr.stride
    }
    gl.bindVertexArray(0)
  }

  /** Draws the vertices that has been set. */
  draw(primitiveType: PrimitiveType, count: number, offset = 0) {
    gl.bindVertexArray(this.vertexArray)
    gl.drawArrays(primitiveType, offset, count);
  }

  /** Draws the indices that has been set. */
  drawIndexed(primitiveType: PrimitiveType, count: number, offset = 0) {
    gl.bindVertexArray(this.vertexArray)
    gl.drawElements(primitiveType, count, gl.UNSIGNED_INT, offset);
  }

  /** Sets the vertices to draw. */
  setVertexData(
      vertices: Float32Array, usage: BufferUsage = BufferUsage.Static) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, usage)
  }

  /** Sets the indices to draw. */
  setIndexData(
      indices: Uint32Array, usage: BufferUsage = BufferUsage.Static) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, usage)
  }
}