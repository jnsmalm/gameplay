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
  Apostrophe = glfw.KEY_APOSTROPHE,
  B = glfw.KEY_B,
  Backslash = glfw.KEY_BACKSLASH,
  Backspace = glfw.KEY_BACKSPACE,
  C = glfw.KEY_C,
  CapsLock = glfw.KEY_CAPS_LOCK,
  Comma = glfw.KEY_COMMA,
  D = glfw.KEY_D,
  Delete = glfw.KEY_DELETE,
  Down = glfw.KEY_DOWN,
  E = glfw.KEY_E,
  End = glfw.KEY_END,
  Enter = glfw.KEY_ENTER,
  Equal = glfw.KEY_EQUAL,
  Escape = glfw.KEY_ESCAPE,
  F = glfw.KEY_F,
  G = glfw.KEY_G,
  H = glfw.KEY_H,
  Home = glfw.KEY_HOME,
  I = glfw.KEY_I,
  Insert = glfw.KEY_INSERT,
  J = glfw.KEY_J,
  K = glfw.KEY_K,
  L = glfw.KEY_L,
  Left = glfw.KEY_LEFT,
  LeftAlt = glfw.KEY_LEFT_ALT,
  LeftBracket = glfw.KEY_LEFT_BRACKET,
  LeftControl = glfw.KEY_LEFT_CONTROL,
  LeftShift = glfw.KEY_LEFT_SHIFT,
  M = glfw.KEY_M,
  Menu = glfw.KEY_MENU,
  Minus = glfw.KEY_MINUS,
  N = glfw.KEY_N,
  NumLock = glfw.KEY_NUM_LOCK,
  O = glfw.KEY_O,
  P = glfw.KEY_P,
  PageDown = glfw.KEY_PAGE_DOWN,
  PageUp = glfw.KEY_PAGE_UP,
  Pause = glfw.KEY_PAUSE,
  Period = glfw.KEY_PERIOD,
  PrintScreen = glfw.KEY_PRINT_SCREEN,
  Q = glfw.KEY_Q,
  R = glfw.KEY_R,
  Right = glfw.KEY_RIGHT,
  RightAlt = glfw.KEY_RIGHT_ALT,
  RightBracket = glfw.KEY_RIGHT_BRACKET,
  RightControl = glfw.KEY_RIGHT_CONTROL,
  RightShift = glfw.KEY_RIGHT_SHIFT,
  S = glfw.KEY_S,
  ScrollLock = glfw.KEY_SCROLL_LOCK,
  Semicolon = glfw.KEY_SEMICOLON,
  Slash = glfw.KEY_SLASH,
  Space = glfw.KEY_SPACE,
  T = glfw.KEY_T,
  Tab = glfw.KEY_TAB,
  U = glfw.KEY_U,
  Unknown = glfw.KEY_UNKNOWN,
  Up = glfw.KEY_UP,
  V = glfw.KEY_V,
  W = glfw.KEY_W,
  X = glfw.KEY_X,
  Y = glfw.KEY_Y,
  Z = glfw.KEY_Z,
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