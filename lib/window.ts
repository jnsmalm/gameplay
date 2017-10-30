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
import * as glfw from "gameplay/glfw"

export interface WindowOptions {
  width?: number
  height?: number
  title?: string
  fullscreen?: boolean
}

export class WindowInput {
  keys: {
    [key: number]: InputState
  } = {}
  mouseButtons: {
    [button: number]: InputState
  } = {}
  cursor = { x: 0, y: 0 }
  text = ""
}

export enum InputState {
  Released = 0,
  Pressed = 1,
  Repeated = 2,
  Squeezed = 3
}

export class Window {
  private _input = { curr: new WindowInput(), next: new WindowInput() }

  readonly height: number
  readonly width: number
  readonly handle: glfw.GLFWwindow

  /**
   * Returns the current input state.
   */
  get input() {
    return this._input.curr
  }

  /**
   * Creates a new window and sets OpenGL context.
   */
  constructor(options: WindowOptions = {}) {
    var {
      width = options.fullscreen ? null : 1024,
      height = options.fullscreen ? null : 576,
      title = "",
      fullscreen = false
    } = options

    let videoMode: glfw.VideoMode
    if (fullscreen && (!width || !height)) {
      videoMode = glfw.getVideoMode(glfw.getPrimaryMonitor());
      ({ width, height } = videoMode)
    }
    this.setWindowHints(videoMode)

    this.handle = glfw.createWindow(width, height, title,
      fullscreen ? glfw.getPrimaryMonitor() : null)
    glfw.makeContextCurrent(this.handle)
    gl.init()

    if (fullscreen) {
      // GLFW might have selected a different resolution
      ({ width, height } = glfw.getVideoMode(glfw.getPrimaryMonitor()))
    }
    this.width = width
    this.height = height

    let size = glfw.getFramebufferSize(this.handle)
    gl.viewport(0, 0, size.width, size.height)

    glfw.setKeyCallback(this.handle, (key, scancode, action, mods) => {
      if (action === 0) {
        // Whenever you poll state, you risk missing the state change you are 
        // looking for. If a pressed key is released again before you poll its 
        // state, you will have missed the key press.
        if (!this._input.next.keys[key]) {
          this._input.next.keys[key] = action
        }
      } else {
        this._input.next.keys[key] = action
      }
    })

    glfw.setCharModsCallback(this.handle, (codepoint, mods) => {
      this._input.next.text += String.fromCodePoint(codepoint)
    })

    glfw.setMouseButtonCallback(this.handle, (button, action, mods) => {
      if (action === 0) {
        if (!this._input.next.mouseButtons[button]) {
          this._input.next.mouseButtons[button] = action
        }
      } else {
        this._input.next.mouseButtons[button] = action
      }
    })
  }

  private setWindowHints(videoMode: glfw.VideoMode) {
    glfw.windowHint(glfw.CONTEXT_VERSION_MAJOR, 3)
    glfw.windowHint(glfw.CONTEXT_VERSION_MINOR, 3)
    glfw.windowHint(glfw.OPENGL_FORWARD_COMPAT, 1)
    glfw.windowHint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)

    if (!videoMode) {
      return
    }
    glfw.windowHint(glfw.RED_BITS, videoMode.redBits)
    glfw.windowHint(glfw.GREEN_BITS, videoMode.greenBits)
    glfw.windowHint(glfw.BLUE_BITS, videoMode.blueBits)
    glfw.windowHint(glfw.REFRESH_RATE, videoMode.refreshRate)
  }

  /** Processes all pending events. */
  static pollEvents() {
    glfw.pollEvents()
  }

  /** Updates input state. */
  update() {
    this._input.curr.text = this._input.next.text
    this._input.curr.cursor = glfw.getCursorPos(this.handle)

    for (let key in this._input.curr.keys) {
      if (this._input.curr.keys[key] === InputState.Released) {
        delete this._input.curr.keys[key]
        continue
      }
      let isPressed = glfw.getKey(this.handle, parseInt(key))
      if (this._input.curr.keys[key] && isPressed) {
        this._input.curr.keys[key] = InputState.Squeezed
      } else {
        this._input.curr.keys[key] = InputState.Released
      }
    }
    for (let key in this._input.next.keys) {
      this._input.curr.keys[key] = this._input.next.keys[key]
    }

    for (let button in this._input.curr.mouseButtons) {
      if (this._input.curr.mouseButtons[button] === InputState.Released) {
        delete this._input.curr.mouseButtons[button]
        continue
      }
      let isPressed = glfw.getMouseButton(this.handle, parseInt(button))
      if (this._input.curr.mouseButtons[button] && isPressed) {
        this._input.curr.mouseButtons[button] = InputState.Squeezed
      } else {
        this._input.curr.mouseButtons[button] = InputState.Released
      }
    }
    for (let button in this._input.next.mouseButtons) {
      this._input.curr.mouseButtons[button] = this._input.next.mouseButtons[button]
    }

    this._input.next = new WindowInput()
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

  setCursorMode(mode: number) {
    glfw.setInputMode(this.handle, glfw.CURSOR, mode)
  }
}