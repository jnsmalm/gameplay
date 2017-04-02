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

export enum KeyCode {
  A = glfw.KEY_A,
  B = glfw.KEY_B,
  C = glfw.KEY_C,
  D = glfw.KEY_D,
  E = glfw.KEY_E,
  F = glfw.KEY_F,
  G = glfw.KEY_G,
  H = glfw.KEY_H,
  I = glfw.KEY_I,
  J = glfw.KEY_J,
  K = glfw.KEY_K,
  L = glfw.KEY_L,
  M = glfw.KEY_M,
  N = glfw.KEY_N,
  O = glfw.KEY_O,
  P = glfw.KEY_P,
  Q = glfw.KEY_Q,
  R = glfw.KEY_R,
  S = glfw.KEY_S,
  T = glfw.KEY_T,
  U = glfw.KEY_U,
  V = glfw.KEY_V,
  W = glfw.KEY_W,
  X = glfw.KEY_X,
  Y = glfw.KEY_Y,
  Z = glfw.KEY_Z,
  Escape = glfw.KEY_ESCAPE
}

export enum MouseMode {
  Normal = glfw.CURSOR_NORMAL,
  Disabled = glfw.CURSOR_DISABLED,
  Hidden = glfw.CURSOR_HIDDEN
}

export enum MouseButton {
  Left = glfw.MOUSE_BUTTON_LEFT,
  Middle = glfw.MOUSE_BUTTON_MIDDLE,
  Right = glfw.MOUSE_BUTTON_RIGHT
}

import { Window } from "./window"

export class Mouse {
  private state = { 
    new: {}, 
    old: {}
  }
  readonly position = { x: <number>null, y: <number>null }
  readonly delta = { x: 0, y: 0 }

  constructor(readonly window: Window) {
    glfw.setInputMode(window.handle, glfw.STICKY_MOUSE_BUTTONS, glfw.TRUE)
  }

  update() {
    this.state.old = this.state.new
    this.state.new = {}

    let position = glfw.getCursorPos(this.window.handle)
    if (this.position) {
      this.delta.x = position.x - this.position.x
      this.delta.y = position.y - this.position.y
    }
    this.position.x = position.x
    this.position.y = position.y
  }

  isButtonDown(button: MouseButton) {
    this.state.new[button] = glfw.getMouseButton(this.window.handle, button)
    return this.state.new[button] === glfw.PRESS
  }

  isButtonPress(button: MouseButton) {
    this.state.new[button] = glfw.getMouseButton(this.window.handle, button)
    return this.state.old[button] === glfw.RELEASE && 
      this.state.new[button] === glfw.PRESS
  }

  setMode(mode: MouseMode) {
    glfw.setInputMode(this.window.handle, glfw.CURSOR, mode)
  }
}

export class Keyboard {
  private state = { new: {}, old: {} }

  constructor(readonly window: Window) {
    glfw.setInputMode(window.handle, glfw.STICKY_KEYS, glfw.TRUE)
  }

  /**
   * Updates the state of the keyboard.
   */
  update() {
    this.state.old = this.state.new
    this.state.new = {}
  }

  /**
   * Returns a value indicating if the key was pressed this frame.
   */
  isKeyPress(key: KeyCode) {
    this.state.new[key] = glfw.getKey(this.window.handle, key)
    return this.state.old[key] !== glfw.PRESS &&
      this.state.new[key] === glfw.PRESS
  }

  /**
   * Returns a value indicating if the key state is down.
   */
  isKeyDown(key: KeyCode) {
    return glfw.getKey(this.window.handle, key) === glfw.PRESS
  }
}