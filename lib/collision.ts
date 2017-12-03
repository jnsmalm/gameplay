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
import { Component } from "./entity"
import { Pool } from "./utils"
import { Transform } from "./transform"

const vector = new Pool(Vector3, 20)
const quaternion = new Pool(Quaternion, 20)
const matrix = new Pool(Matrix4, 20)

class Projection {
  /**
   * Creates a new projection with given min, max.
   */
  constructor(private min = 0, private max = 0) { }

  /**
   * Returns the overlap of the two projections.
   */
  getOverlap(p: Projection) {
    if (this.min < p.min) {
      return p.min - this.max
    } else {
      return this.min - p.max
    }
  }
}

/**
 * Represents a shape for use with the Separating Axis Theorem (SAT).
 */
class Shape {
  points: Vector3[] = []
  radius = 0
  center = new Vector3()
  normals: Vector3[] = []

  /**
   * Projects the shape onto the given axis.
   * @param axis Normalized axis.
   */
  project(axis: Vector3) {
    let dot = Vector3.dot(this.points[0], axis)
    let min = dot
    let max = dot
    for (let i = 1; i < this.points.length; i++) {
      // NOTE: The axis must be normalized to get accurate projections.
      dot = Vector3.dot(this.points[i], axis)
      min = Math.min(dot, min)
      max = Math.max(dot, max)
    }
    return new Projection(min - this.radius, max + this.radius)
  }

  /**
   * Returns true if the shapes are intersecting.
   * @param axes Normalized axes.
   * @param mtv Minumum translation vector, used for collision response.
   */
  static isIntersecting(a: Shape, b: Shape, axes: Vector3[], mtv?: Vector3) {
    let overlap = Number.MAX_VALUE
    let smallest: Vector3 | undefined

    for (let axis of axes) {
      let p1 = a.project(axis)
      let p2 = b.project(axis)
      if (p1.getOverlap(p2) >= 0) {
        // Then we can guarantee that the shapes do not overlap.
        return false
      }
      let o = Math.abs(p1.getOverlap(p2))
      if (o < overlap) {
        overlap = o
        smallest = axis
      }
    }
    if (mtv && smallest) {
      smallest.copy(mtv)
      let d = Vector3.subtract(a.center, b.center, vector.next())
      if (Vector3.dot(d, mtv) < 0) {
        mtv.negate(mtv)
      }
      mtv.scale(overlap, mtv)
    }
    // If we get here then we know that every axis had overlap on it so we 
    // can guarantee an intersection.
    return true
  }
}

export class SphereCollider implements Component {
  private _shape = new Shape()

  transform = new Transform()

  constructor(public radius: number) {
    this._shape.points.push(new Vector3())
  }

  /**
   * Attaches the collider to a transform.
   */
  attach(transform: Transform) {
    this.transform.parent = transform
  }

  /**
   * Updates the collider to be able to perform collision tests.
   */
  update() {
    // For a sphere the center and the single point is the same.
    this.transform.getPosition(vector.next())
      .copy(this._shape.center)
      .copy(this._shape.points[0])

    // We need to multiply the radius with the scaling. We must choose a 
    // single component of the scaling, we choose the 'x' component.
    this._shape.radius =
      this.radius * this.transform.getScaling(vector.next())[0]
  }

  isColliding(collider: SphereCollider | BoxCollider, mtv?: Vector3) {
    if (collider instanceof BoxCollider) {
      let result = collider.isColliding(this, mtv)
      if (mtv) {
        mtv.scale(-1, mtv)
      }
      return result
    }
    let axes: Vector3[] = []

    // For two spheres there is only one axis test
    let axis = Vector3.subtract(this._shape.center, collider._shape.center, vector.next())
    axes.push(axis.normalize(axis))

    return Shape.isIntersecting(this._shape, collider._shape, axes, mtv)
  }
}

export class BoxCollider implements Component {
  private static _points = [
    -1, +1, -1, +1, +1, -1, -1, -1, -1, +1, -1, -1,
    -1, +1, +1, +1, +1, +1, -1, -1, +1, +1, -1, +1
  ]
  private _shape = new Shape()

  transform = new Transform()

  constructor(public extents: Vector3) {
    for (let i = 0; i < 8; i++) {
      this._shape.points.push(new Vector3());
    }
    for (let i = 0; i < 3; i++) {
      this._shape.normals.push(new Vector3());
    }
  }

  /**
   * Attaches the collider to a transform.
   */
  attach(transform: Transform) {
    this.transform.parent = transform
  }

  /**
   * Updates the collider to be able to perform collision tests.
   */
  update() {
    let world = this.transform.getWorldMatrix(matrix.next())
    for (let i = 0; i < 8; i++) {
      let point = this._shape.points[i]
      for (let j = 0; j < 3; j++) {
        point[j] = this.extents[j] * BoxCollider._points[i * 3 + j]
      }
      point.transform(world, point)
    }
    this._shape.normals[0].set([1, 0, 0])
    this._shape.normals[1].set([0, 1, 0])
    this._shape.normals[2].set([0, 0, 1])

    let rotation = this.transform.getRotation(quaternion.next())
    for (let i = 0; i < 3; i++) {
      this._shape.normals[i].transform(rotation, this._shape.normals[i])
      this._shape.normals[i].normalize(this._shape.normals[i])
    }
    this.transform.getPosition(this._shape.center)
  }

  isColliding(collider: BoxCollider | SphereCollider, mtv?: Vector3) {
    let axes: Vector3[] = []

    if (collider instanceof BoxCollider) {
      // The first 6 axes (from the face normals) are used to check if there is 
      // a corner of one object intersecting a face of the other object.
      axes.push(...this._shape.normals, ...collider._shape.normals)

      // The set of 9 axes formed by the cross products of edges are used to 
      // consider edge on edge collision detection, where there is not a vertex 
      // penetrating the other object.
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          let c = Vector3.cross(this._shape.normals[i], collider._shape.normals[j], vector.next())
          if (c.sqrMagnitude === 0) {
            continue
          }
          axes.push(c.normalize(c))
        }
      }
    }

    if (collider instanceof SphereCollider) {
      let sphereCenter = collider.transform.getPosition(vector.next())
      let closestPoint = this.getClosestPoint(sphereCenter, vector.next())

      // When testing box with sphere using SAT, the only axis that needs to
      // be tested goes from center of sphere to closest point on box.
      Vector3.add(closestPoint, this._shape.center, closestPoint)
      Vector3.subtract(closestPoint, sphereCenter, closestPoint)
      axes.push(closestPoint.normalize(closestPoint))
    }
    return Shape.isIntersecting(this._shape, (<any>collider)._shape, axes, mtv)
  }

  private getClosestPoint(point: Vector3, out: Vector3) {
    let diff = Vector3.subtract(point, this._shape.center, vector.next())
    let scal = this.transform.getScaling(vector.next())
    let exts = $.Vector3.multiply(this.extents, scal, vector.next())

    out.fill(0)
    for (var i = 0; i < 3; i++) {
      let dist = Vector3.dot(diff, this._shape.normals[i])
      if (dist > exts[i]) {
        dist = exts[i]
      }
      if (dist < -exts[i]) {
        dist = -exts[i]
      }
      Vector3.add(out, this._shape.normals[i].scale(dist, vector.next()), out)
    }
    return out
  }
}