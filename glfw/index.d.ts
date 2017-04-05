declare module "gameplay/glfw" {
  interface VideoMode {
    redBits: number
    greenBits: number
    blueBits: number
    refreshRate: number
    width: number
    height: number
  }
  
  function createWindow(width: number, height: number,
    title: string, monitor?: number, share?: number): number
  function destroyWindow(window: number): void
  function getCursorPos(window: number): {
    x: number
    y: number
  }
  function getFramebufferSize(window: number): {
    width: number
    height: number
  }
  function getMouseButton(window: number, button: number): number
  function getKey(window: number, key: number): number
  function getPrimaryMonitor(): number
  function getTime(): number
  function getVideoMode(monitor: number): VideoMode
  function init(): void
  function makeContextCurrent(window: number): void
  function setInputMode(window: number, mode: number, value: number): void
  function setWindowShouldClose(window: number, value: number): void
  function swapBuffers(window: number): void
  function pollEvents(): void
  function terminate(): void
  function windowHint(hint: number, value: number): void
  function windowShouldClose(window: number): boolean

  const FOCUSED: number
  const ICONIFIED: number
  const RESIZABLE: number
  const VISIBLE: number
  const DECORATED: number
  const AUTO_ICONIFY: number
  const FLOATING: number
  const MAXIMIZED: number
  const RED_BITS: number
  const GREEN_BITS: number
  const BLUE_BITS: number
  const ALPHA_BITS: number
  const DEPTH_BITS: number
  const STENCIL_BITS: number
  const ACCUM_RED_BITS: number
  const ACCUM_GREEN_BITS: number
  const ACCUM_BLUE_BITS: number
  const ACCUM_ALPHA_BITS: number
  const AUX_BUFFERS: number
  const STEREO: number
  const SAMPLES: number
  const SRGB_CAPABLE: number
  const REFRESH_RATE: number
  const DOUBLEBUFFER: number
  const CLIENT_API: number
  const CONTEXT_VERSION_MAJOR: number
  const CONTEXT_VERSION_MINOR: number
  const CONTEXT_REVISION: number
  const CONTEXT_ROBUSTNESS: number
  const OPENGL_FORWARD_COMPAT: number
  const OPENGL_DEBUG_CONTEXT: number
  const OPENGL_PROFILE: number
  const CONTEXT_RELEASE_BEHAVIOR: number
  const CONTEXT_NO_ERROR: number
  const CONTEXT_CREATION_API: number
  const NO_API: number
  const OPENGL_API: number
  const OPENGL_ES_API: number
  const NO_ROBUSTNESS: number
  const NO_RESET_NOTIFICATION: number
  const LOSE_CONTEXT_ON_RESET: number
  const OPENGL_ANY_PROFILE: number
  const OPENGL_CORE_PROFILE: number
  const OPENGL_COMPAT_PROFILE: number
  const CURSOR: number
  const STICKY_KEYS: number
  const STICKY_MOUSE_BUTTONS: number
  const CURSOR_NORMAL: number
  const CURSOR_HIDDEN: number
  const CURSOR_DISABLED: number
  const ANY_RELEASE_BEHAVIOR: number
  const RELEASE_BEHAVIOR_FLUSH: number
  const RELEASE_BEHAVIOR_NONE: number
  const NATIVE_CONTEXT_API: number
  const EGL_CONTEXT_API: number
  const KEY_UNKNOWN: number
  const KEY_SPACE: number
  const KEY_APOSTROPHE: number
  const KEY_COMMA: number
  const KEY_MINUS: number
  const KEY_PERIOD: number
  const KEY_SLASH: number
  const KEY_0: number
  const KEY_1: number
  const KEY_2: number
  const KEY_3: number
  const KEY_4: number
  const KEY_5: number
  const KEY_6: number
  const KEY_7: number
  const KEY_8: number
  const KEY_9: number
  const KEY_SEMICOLON: number
  const KEY_EQUAL: number
  const KEY_A: number
  const KEY_B: number
  const KEY_C: number
  const KEY_D: number
  const KEY_E: number
  const KEY_F: number
  const KEY_G: number
  const KEY_H: number
  const KEY_I: number
  const KEY_J: number
  const KEY_K: number
  const KEY_L: number
  const KEY_M: number
  const KEY_N: number
  const KEY_O: number
  const KEY_P: number
  const KEY_Q: number
  const KEY_R: number
  const KEY_S: number
  const KEY_T: number
  const KEY_U: number
  const KEY_V: number
  const KEY_W: number
  const KEY_X: number
  const KEY_Y: number
  const KEY_Z: number
  const KEY_LEFT_BRACKET: number
  const KEY_BACKSLASH: number
  const KEY_RIGHT_BRACKET: number
  const KEY_GRAVE_ACCENT: number
  const KEY_WORLD_1: number
  const KEY_WORLD_2: number
  const KEY_ESCAPE: number
  const KEY_ENTER: number
  const KEY_TAB: number
  const KEY_BACKSPACE: number
  const KEY_INSERT: number
  const KEY_DELETE: number
  const KEY_RIGHT: number
  const KEY_LEFT: number
  const KEY_DOWN: number
  const KEY_UP: number
  const KEY_PAGE_UP: number
  const KEY_PAGE_DOWN: number
  const KEY_HOME: number
  const KEY_END: number
  const KEY_CAPS_LOCK: number
  const KEY_SCROLL_LOCK: number
  const KEY_NUM_LOCK: number
  const KEY_PRINT_SCREEN: number
  const KEY_PAUSE: number
  const KEY_F1: number
  const KEY_F2: number
  const KEY_F3: number
  const KEY_F4: number
  const KEY_F5: number
  const KEY_F6: number
  const KEY_F7: number
  const KEY_F8: number
  const KEY_F9: number
  const KEY_F10: number
  const KEY_F11: number
  const KEY_F12: number
  const KEY_F13: number
  const KEY_F14: number
  const KEY_F15: number
  const KEY_F16: number
  const KEY_F17: number
  const KEY_F18: number
  const KEY_F19: number
  const KEY_F20: number
  const KEY_F21: number
  const KEY_F22: number
  const KEY_F23: number
  const KEY_F24: number
  const KEY_F25: number
  const KEY_KP_0: number
  const KEY_KP_1: number
  const KEY_KP_2: number
  const KEY_KP_3: number
  const KEY_KP_4: number
  const KEY_KP_5: number
  const KEY_KP_6: number
  const KEY_KP_7: number
  const KEY_KP_8: number
  const KEY_KP_9: number
  const KEY_KP_DECIMAL: number
  const KEY_KP_DIVIDE: number
  const KEY_KP_MULTIPLY: number
  const KEY_KP_SUBTRACT: number
  const KEY_KP_ADD: number
  const KEY_KP_ENTER: number
  const KEY_KP_EQUAL: number
  const KEY_LEFT_SHIFT: number
  const KEY_LEFT_CONTROL: number
  const KEY_LEFT_ALT: number
  const KEY_LEFT_SUPER: number
  const KEY_RIGHT_SHIFT: number
  const KEY_RIGHT_CONTROL: number
  const KEY_RIGHT_ALT: number
  const KEY_RIGHT_SUPER: number
  const KEY_MENU: number
  const KEY_LAST: number
  const MOD_SHIFT: number
  const MOD_CONTROL: number
  const MOD_ALT: number
  const MOD_SUPER: number
  const MOUSE_BUTTON_1: number
  const MOUSE_BUTTON_2: number
  const MOUSE_BUTTON_3: number
  const MOUSE_BUTTON_4: number
  const MOUSE_BUTTON_5: number
  const MOUSE_BUTTON_6: number
  const MOUSE_BUTTON_7: number
  const MOUSE_BUTTON_8: number
  const MOUSE_BUTTON_LAST: number
  const MOUSE_BUTTON_LEFT: number
  const MOUSE_BUTTON_RIGHT: number
  const MOUSE_BUTTON_MIDDLE: number
  const RELEASE: number
  const PRESS: number
  const REPEAT: number
  const FALSE: number
  const TRUE: number
}