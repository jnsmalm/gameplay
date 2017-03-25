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

export class Color extends Float32Array {
  constructor(r = 0, g = 0, b = 0, a = 0) {
    super([r, g, b, a])
  }

  /** Red component of the color. */
  get r() {
    return this[0]
  }
  set r(r: number) {
    this[0] = r
  }

  /** Green component of the color. */
  get g() {
    return this[1]
  }
  set g(g: number) {
    this[1] = g
  }

  /** Blue component of the color. */
  get b() {
    return this[2]
  }
  set b(b: number) {
    this[2] = b
  }

  /** Alpha component of the color. */
  get a() {
    return this[3]
  }
  set a(a: number) {
    this[3] = a
  }
}