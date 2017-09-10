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

import { Vector3, Matrix4, Quaternion } from "./math"
import { Pool } from "./utils"
import { Transform } from "./transform"
import { Window } from "./window"
import { Component } from "./entity"

const matrix = new Pool(Matrix4, 10)
const vector = new Pool(Vector3, 10)

/**
 * A camera is a device through which the world is viewed.
 */
export class Camera implements Component {
  transform = new Transform()

  /**
   * Creates a new camera.
   */
  constructor(public aspect: number, public near = 0.1, public far = 1000,
    public fieldOfView = 45, public orthographic = false,
    public orthographicSize = 5) { }

  /**
   * Creates a new camera.
   */
  static createDefault(window: Window, orthographic = false) {
    let camera = new Camera(
      window.width / window.height, 0.1, 1000, 45, orthographic)
    camera.transform.localPosition.z = 5
    camera.transform.localRotation.rotateY(180)
    return camera
  }

  attach(transform: Transform) {
    this.transform.parent = transform
  }

  /**
   * Returns the projection matrix.
   */
  getProjection(out = new Matrix4()) {
    if (this.orthographic) {
      var w = this.orthographicSize * this.aspect
      return Matrix4.createOrtho(-w, w, -this.orthographicSize,
        this.orthographicSize, this.near, this.far, out)
    }
    return Matrix4.createPerspective(
      this.fieldOfView, this.aspect, this.near, this.far, out)
  }

  /**
   * Returns the view matrix.
   */
  getView(out = new Matrix4()) {
    let world = this.transform.getWorldMatrix(matrix.next())
    let position = this.transform.getPosition(vector.next())
    let forward = world.getForward(vector.next())
    let up = world.getUp(vector.next())
    let center = Vector3.add(position, forward, vector.next())
    return Matrix4.createLookAt(position, center, up, out)
  }
  
  /**
   * Returns the view projection matrix.
   */
  getViewProjection(out = new Matrix4()) {
    let projection = this.getProjection(matrix.next())
    let view = this.getView(matrix.next())
    return Matrix4.multiply(projection, view, out)
  }
}