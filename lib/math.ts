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

const vec2 = require("./gl-matrix/vec2")
const vec3 = require("./gl-matrix/vec3")
const mat4 = require("./gl-matrix/mat4")
const quat = require("./gl-matrix/quat")

export namespace Angle {
  /**
   * Degrees-to-radians conversion constant.
   */
  export const deg2rad = (Math.PI * 2) / 360
  /**
   * Radians-to-degrees conversion constant.
   */
  export const rad2deg = 360 / (Math.PI * 2)
}

export namespace Lerp {
  /**
   * Linearly interpolates between two values.
   */
  export function number(a: number, b: number, t: number) {
    return a + t * (b - a)
  }
}

/**
 * Representation of 2D vectors and points.
 */
export class Vector2 extends Float32Array {
  /**
   * Creates a new vector.
   */
  constructor(x = 0, y = 0) {
    super([x, y])
  }
  /**
   * X component of the vector.
   */
  get x(): number {
    return this[0]
  }
  set x(value: number) {
    this[0] = value
  }
  /**
   * Y component of the vector.
   */
  get y(): number {
    return this[1]
  }
  set y(value: number) {
    this[1] = value
  }
}

/**
 * Representation of 3D vectors and points.
 */
export class Vector3 extends Float32Array {
  /**
   * Creates a new vector.
   */
  constructor(x = 0, y = 0, z = 0) {
    super([x, y, z])
  }
  /**
   * Adds two vectors.
   */
  static add(a: Vector3, b: Vector3, out = new Vector3()) {
    return <Vector3>vec3.add(out, a, b)
  }
  /**
   * Returns the angle in degrees between two vectors.
   */
  static angle(a: Vector3, b: Vector3) {
    return <number>vec3.angle(a, b) * Angle.rad2deg
  }
  /**
   * Copies the vector.
   */
  copy(out = new Vector3()) {
    return <Vector3>vec3.copy(out, this)
  }
  /**
   * Cross product of two vectors.
   */
  static cross(a: Vector3, b: Vector3, out = new Vector3()) {
    return <Vector3>vec3.cross(out, a, b)
  }
  /**
   * Dot product of two vectors.
   */
  static dot(a: Vector3, b: Vector3) {
    return <number>vec3.dot(a, b)
  }
  /**
   * Returns true if the vectors are equal.
   */
  static equals(a: Vector3, b: Vector3) {
    return <boolean>vec3.equals(a, b)
  }
  /**
   * Linearly interpolates between two vectors.
   */
  static lerp(a: Vector3, b: Vector3, t: number, out = new Vector3()) {
    return <Vector3>vec3.lerp(out, a, b, t)
  }
  /**
   * Magnitude/length of the vector.
   */
  get magnitude() {
    return <number>vec3.length(this)
  }
  /**
   * Multiplies two vectors.
   */
  static multiply(a: Vector3, b: Vector3, out = new Vector3()) {
    return <Vector3>vec3.mul(out, a, b)
  }
  /**
   * Negates the components of the vector.
   */
  negate(out = new Vector3()) {
    return <Vector3>vec3.negate(out, this)
  }
  /**
   * Normalizes the vector.
   */
  normalize(out = new Vector3()) {
    return <Vector3>vec3.normalize(out, this)
  }
  /**
   * Scales by a scalar number.
   */
  scale(n: number, out = new Vector3()) {
    return <Vector3>vec3.scale(out, this, n)
  }
  /**
   * Squared distance between two vectors.
   */
  sqrDistance(v: Vector3) {
    return <number>vec3.squaredDistance(this, v)
  }
  /**
   * Squared magnitude/length of the vector.
   */
  get sqrMagnitude() {
    return <number>vec3.squaredLength(this)
  }
  /**
   * Subtracts one vector from another.
   */
  static subtract(a: Vector3, b: Vector3, out = new Vector3()) {
    return <Vector3>vec3.sub(out, a, b)
  }
  /**
   * Transforms the vector using a matrix or quaternion.
   */
  transform(t: Matrix4 | Quaternion, out = new Vector3()) {
    if (t instanceof Matrix4) {
      return <Vector3>vec3.transformMat4(out, this, t)
    }
    if (t instanceof Quaternion) {
      return <Vector3>vec3.transformQuat(out, this, t)
    }
  }
  /**
   * X component of the vector.
   */
  get x() {
    return this[0]
  }
  set x(value: number) {
    this[0] = value
  }
  /**
   * Y component of the vector.
   */
  get y() {
    return this[1]
  }
  set y(value: number) {
    this[1] = value
  }
  /**
   * Z component of the vector.
   */
  get z() {
    return this[2]
  }
  set z(value: number) {
    this[2] = value
  }
}

/**
 * A standard 4x4 transformation matrix.
 */
export class Matrix4 extends Float32Array {
  /**
   * Creates a new matrix.
   */
  constructor() {
    super(16)
  }
  /**
   * Creates a identity matrix.
   */
  static createIdentity(out = new Matrix4()) {
    return <Matrix4>mat4.identity(out)
  }
  /**
   * Creates a look-at view matrix.
   */
  static createLookAt(eye: Vector3, center: Vector3, up: Vector3, 
      out = new Matrix4()) {
    return <Matrix4>mat4.lookAt(out, eye, center, up)
  }
  /**
   * Creates an orthogonal projection matrix.
   */
  static createOrtho(left: number, right: number, bottom: number, top: number, 
      near: number, far: number, out = new Matrix4()) {
    return <Matrix4>mat4.ortho(out, left, right, bottom, top, near, far)
  }
  /**
   * Creates a perspective projection matrix.
   */
  static createPerspective(fov: number, aspect: number, near: number, 
      far: number, out = new Matrix4()) {
    return <Matrix4>mat4.perspective(out, fov, aspect, near, far)
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and 
   * vector scale.
   */
  static createRotationTranslationScale(rotation: Quaternion, 
      translation: Vector3, scale: Vector3, out = new Matrix4()) {
    return <Matrix4>mat4.fromRotationTranslationScale(
      out, rotation, translation, scale)
  }
  /** 
   * Forward vector of the matrix.
   */
  getForward(out = new Vector3()) {
    out[0] = this[8]
    out[1] = this[9]
    out[2] = this[10]
    return out
  }
  /**
   * Right vector of the matrix.
   */
  getRight(out = new Vector3()) {
    out[0] = this[0]
    out[1] = this[1]
    out[2] = this[2]
    return out
  }
  /** 
   * Up vector of the matrix.
   */
  getUp(out = new Vector3()) {
    out[0] = this[4]
    out[1] = this[5]
    out[2] = this[6]
    return out
  }
  /**
   * Multiplies two vectors.
   */
  static multiply(a: Matrix4, b: Matrix4, out = new Matrix4()) {
    return <Matrix4>mat4.multiply(out, a, b)
  }
  /**
   * Transpose of the matrix.
   */
  transpose(out = new Matrix4()) {
    return <Matrix4>mat4.transpose(out, this)
  }
}

/**
 * Quaternions are used to represent rotations.
 */
export class Quaternion extends Float32Array {
  /**
   * Creates a new quaternion.
   */
  constructor() {
    super(4)
  }
  /**
   * Copies the quaternion.
   */
  copy(out = new Quaternion()) {
    return <Quaternion>quat.copy(out, this)
  }
  /**
   * Creates a new quaternion from a vector and an angle to rotate about the 
   * vector.
   */
  static createFromAxisAngle(axis: Vector3, degrees: number, 
      out = new Quaternion()) {
    return <Quaternion>quat.setAxisAngle(out, axis, degrees * Angle.deg2rad)
  }
  /**
   * Creates a identity quaternion.
   */
  static createIdentity(out = new Quaternion()) {
    return <Quaternion>quat.identity(out)
  }
  /**
   * Multiplies two quaternions.
   */
  static multiply(a: Quaternion, b: Quaternion, out = new Quaternion()) {
    return <Quaternion>quat.mul(out, a, b)
  }
  /**
   * Rotates by the given angle (in degrees) about the X axis.
   */
  rotateX(degrees: number) {
    quat.rotateX(this, this, degrees * Angle.deg2rad)
  }
  /**
   * Rotates by the given angle (in degrees) about the Y axis.
   */
  rotateY(degrees: number) {
    quat.rotateY(this, this, degrees * Angle.deg2rad)
  }
  /**
   * Rotates by the given angle (in degrees) about the Z axis.
   */
  rotateZ(degrees: number) {
    quat.rotateZ(this, this, degrees * Angle.deg2rad)
  }
}