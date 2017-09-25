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

import * as glfw from "gameplay/glfw"
import * as gl from "gameplay/opengl"

import { Window, WindowOptions } from "./window"
import { Mouse, Keyboard, KeyCode  } from "./input"
import { Color } from "./color"
import { BlendState, DepthState, RasterizerState } from "./renderstate"

export interface GameOptions {
  window?: WindowOptions
  escapeKeyAsExit?: boolean
  isFixedTimeStep?: boolean
  targetElapsedTime?: number
  clearColor?: Color
}

let timeStep: TimeStep
let lastTime = 0

export module Game {
  export let window: Window
  export let keyboard: Keyboard
  export let mouse: Mouse

  /** 
   * Creates a window, input devices and starts running the game loop.
   */
  export function init(options: GameOptions = {}) {
    this.init = () => {}

    let {
      targetElapsedTime = 1 / 60,
      clearColor = new Color(0.9, 0.9, 0.9, 1),
      isFixedTimeStep = true,
      escapeKeyAsExit = true
    } = options

    window = new Window(options.window)
    mouse = new Mouse(window)
    keyboard = new Keyboard(window)

    setImmediate(run)

    timeStep = isFixedTimeStep ?
      new FixedTimeStep(targetElapsedTime) : new TimeStep()
    timeStep.draw = () => {
      clear(clearColor)
      draw()
      window.swapBuffers()
    }
    timeStep.update = (elapsedTime: number) => {
      keyboard.update()
      if (escapeKeyAsExit && keyboard.isKeyDown(KeyCode.Escape)) {
        exit()
        return
      }
      mouse.update()
      update(elapsedTime)
    }

    BlendState.alphaBlend()
    RasterizerState.cullClockwise()
    DepthState.readWrite()
  }

  function run() {
    window.update()
    if (window.isClosing) {
      return
    }
    let time = glfw.getTime()
    timeStep.step(lastTime ? time - lastTime : 0)
    lastTime = time
    setImmediate(run)
  }

  function clear(color: Color) {
    gl.clearColor(color.r, color.g, color.b, color.a)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  /** Exits the game. */
  export function exit() {
    window.close()
  }

  /** Draw implemented by the user. */
  export let draw = () => {}

  /** Update implemented by the user. */
  export let update = (elapsedTime: number) => {}
}

class TimeStep {
  update: (elapsedTime: number) => void
  draw: () => void
  step(elapsedTime: number) {
    this.update(elapsedTime)
    this.draw()
  }
}

class FixedTimeStep extends TimeStep {
  accumulator = 0

  constructor(public targetElapsedTime: number) {
    super()
  }

  step(elapsedTime: number) {
    this.accumulator += elapsedTime
    let updated = false
    while (this.accumulator >= this.targetElapsedTime) {
      this.update(this.targetElapsedTime)
      updated = true
      this.accumulator -= this.targetElapsedTime
      if (this.accumulator <= this.targetElapsedTime / 2) {
        /* Lock updates exactly to the monitor refresh (in order to avoid 
        endlessly accumulating small time deltas, which would eventually add up 
        enough to cause a dropped frame). */
        this.accumulator = 0
      }
    }
    if (updated) {
      this.draw()
    }
  }
}