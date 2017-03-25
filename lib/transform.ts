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

const vector = new Pool(Vector3, 5)
const matrix = new Pool(Matrix4, 5)

/**
 * Position, rotation and scale of an object.
 */
export class Transform {
  localRotation = Quaternion.createIdentity()
  localPosition = new Vector3()
  localScale = new Vector3(1, 1, 1)
  /** 
   * Creates a new transformation.
   */
  constructor(public parent?: Transform) {
  }
  /**
   * Sets the position in world-space.
   */
  setPosition(position: Vector3) {
    if (this.parent) {
      let parentPosition = this.parent.getPosition(vector.next())
      Vector3.subtract(position, parentPosition, this.localPosition)
    } else {
      position.copy(this.localPosition)
    }
  }
  /** 
   * Returns the position in world-space.
   */
  getPosition(out = new Vector3()): Vector3 {
    if (this.parent) {
      let parentPosition = this.parent.getPosition(out)
      return Vector3.add(parentPosition, this.localPosition, out)
    }
    return this.localPosition.copy(out)
  }
  /** 
   * Returns the scaling in world-space.
   */
  getScaling(out = new Vector3()): Vector3 {
    if (this.parent) {
      let parentScaling = this.parent.getScaling(out)
      return Vector3.multiply(parentScaling, this.localScale, out)
    }
    return this.localScale.copy(out)
  }
  /** 
   * Returns the rotation in world-space.
   */
  getRotation(out = new Quaternion()): Quaternion {
    if (this.parent) {
      let parentRotation = this.parent.getRotation(out)
      return Quaternion.multiply(parentRotation, this.localRotation, out)
    }
    return this.localRotation.copy(out)
  }
  /** 
   * Returns the transformation matrix in local-space.
   */
  getLocalMatrix(out = new Matrix4()) {
    return Matrix4.createRotationTranslationScale(
      this.localRotation, this.localPosition, this.localScale, out)
  }
  /** 
   * Returns the transformation matrix in world-space.
   */
  getWorldMatrix(out = new Matrix4()): Matrix4 {
    let local = this.getLocalMatrix(out)
    if (!this.parent) {
      return local
    }
    let parent = this.parent.getWorldMatrix(matrix.next())
    return Matrix4.multiply(parent, local, out)
  }
}