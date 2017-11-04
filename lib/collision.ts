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

import { Vector3 } from "./math"
import { Component } from "./entity"
import { Pool } from "./utils"
import { Transform } from "./transform"

const vector = new Pool(Vector3, 20)

/**
 * Represents an object which can collide with other objects.
 */
export interface Collider<T> {
  /**
   * Returns true if the objects are colliding.
   * @param mtv Minumum translation vector, used for collision response.
   */
  isColliding(collider: T, mtv?: Vector3): boolean
}

export class Projection {
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
export class Shape {
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

export class SphereCollider implements Component, Collider<SphereCollider> {
  private shape = new Shape()
  transform = new Transform()

  constructor(public radius = 0) {
    this.shape.points.push(new Vector3())
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
      .copy(this.shape.center)
      .copy(this.shape.points[0])

    // We need to multiply the radius with the scaling. We must choose a 
    // single component of the scaling, we choose the 'x' component.
    this.shape.radius = 
      this.radius * this.transform.getScaling(vector.next())[0]
  }

  isColliding(collider: SphereCollider, mtv?: Vector3) {
    let axes: Vector3[] = []

    // For two spheres there is only one axis test
    let axis = Vector3.subtract(
      this.shape.center, collider.shape.center, vector.next());
    axes.push(axis.normalize(axis))
    
    return Shape.isIntersecting(this.shape, collider.shape, axes, mtv)
  }
}