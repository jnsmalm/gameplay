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

import * as gl from "gameplay/gl"
import * as glfw from "gameplay/glfw"

export interface WindowOptions {
  width?: number
  height?: number
  title?: string
  fullscreen?: boolean
}

export class Window {
  readonly height: number
  readonly width: number
  readonly handle: number
  /**
   * Creates a new window and sets OpenGL context.
   */
  constructor(options: WindowOptions = {}) {
    var { 
      width = 1024,
      height = 576, 
      title = "", 
      fullscreen = false 
    } = options

    glfw.windowHint(glfw.CONTEXT_VERSION_MAJOR, 3)
    glfw.windowHint(glfw.CONTEXT_VERSION_MINOR, 3)
    glfw.windowHint(glfw.OPENGL_FORWARD_COMPAT, 1)
    glfw.windowHint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)

    this.handle = glfw.createWindow(width, height, title, 
      fullscreen ? glfw.getPrimaryMonitor() : null)
    glfw.makeContextCurrent(this.handle)
    gl.init()

    this.width = width
    this.height = height

    let size = glfw.getFramebufferSize(this.handle)
    gl.viewport(0, 0, size.width, size.height)
  }

  /** Processes all pending events. */
  update() {
    glfw.pollEvents()
  }

  /** Swaps the front and back buffers. */
  swapBuffers() {
    glfw.swapBuffers(this.handle)
  }

  /** Returns a value indicating if the window is closing. */
  get isClosing() {
    return glfw.windowShouldClose(this.handle)
  }

  /** Closes the window. */
  close() {
    glfw.setWindowShouldClose(this.handle, 1)
  }
}