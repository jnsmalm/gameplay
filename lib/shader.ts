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
import * as fs from "fs"

export class Shader {
  readonly program: number
  readonly uniform = new Proxy({}, {
    set: (target: any, p: string, value: any, receiver: any) => {
      return this.setUniform(p, value)
    }
  })

  constructor(vertexSource: string, fragmentSource: string) {
    this.program = gl.createProgram()
    gl.attachShader(this.program,
      this.createShader(gl.VERTEX_SHADER, vertexSource))
    gl.attachShader(this.program,
      this.createShader(gl.FRAGMENT_SHADER, fragmentSource))
    gl.linkProgram(this.program)
    if (gl.getProgramParameter(this.program, gl.LINK_STATUS) === gl.FALSE) {
      throw new TypeError(gl.getProgramInfoLog(this.program))
    }
  }

  /**
   * Creates a shader from file.
   */
  static createFromFile(vertexPath: string, fragmentPath: string) {
    return new Shader(
      fs.readFileSync(vertexPath, "utf8"),
      fs.readFileSync(fragmentPath, "utf8"))
  }

  use() {
    gl.useProgram(this.program)
  }

  private setUniform(name: string, value: any) {
    let location = gl.getUniformLocation(this.program, name)
    if (location < 0) {
      throw new TypeError(`Uniform "${name}" does not exist.`)
    }
    if (typeof value == "number") {
      if (Number.isInteger(value)) {
        gl.uniform1i(location, value)
      } else {
        gl.uniform1f(location, value)
      }
      return true
    } else if (value instanceof Array) {
      if (value.length === 3) {
        gl.uniform3f(location, value[0], value[1], value[2])
        return true
      }
    } else if (value instanceof Float32Array) {
      if (value.length === 3) {
        gl.uniform3f(location, value[0], value[1], value[2])
        return true
      } else if (value.length === 16) {
        gl.uniformMatrix4fv(location, false, value)
        return true
      }
    }
    return false
  }

  private createShader(shaderType: number, source: string) {
    let shader = gl.createShader(shaderType)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === gl.FALSE) {
      throw new TypeError(gl.getShaderInfoLog(shader))
    }
    return shader
  }
}