const glfw = require("./glfw")

glfw.init()
process.on('exit', () => {
  glfw.terminate()
})

glfw.FOCUSED = 0x00020001
glfw.ICONIFIED = 0x00020002
glfw.RESIZABLE = 0x00020003
glfw.VISIBLE = 0x00020004
glfw.DECORATED = 0x00020005
glfw.AUTO_ICONIFY = 0x00020006
glfw.FLOATING = 0x00020007
glfw.MAXIMIZED = 0x00020008
glfw.RED_BITS = 0x00021001
glfw.GREEN_BITS = 0x00021002
glfw.BLUE_BITS = 0x00021003
glfw.ALPHA_BITS = 0x00021004
glfw.DEPTH_BITS = 0x00021005
glfw.STENCIL_BITS = 0x00021006
glfw.ACCUM_RED_BITS = 0x00021007
glfw.ACCUM_GREEN_BITS = 0x00021008
glfw.ACCUM_BLUE_BITS = 0x00021009
glfw.ACCUM_ALPHA_BITS = 0x0002100A
glfw.AUX_BUFFERS = 0x0002100B
glfw.STEREO = 0x0002100C
glfw.SAMPLES = 0x0002100D
glfw.SRGB_CAPABLE = 0x0002100E
glfw.REFRESH_RATE = 0x0002100F
glfw.DOUBLEBUFFER = 0x00021010
glfw.CLIENT_API = 0x00022001
glfw.CONTEXT_VERSION_MAJOR = 0x00022002
glfw.CONTEXT_VERSION_MINOR = 0x00022003
glfw.CONTEXT_REVISION = 0x00022004
glfw.CONTEXT_ROBUSTNESS = 0x00022005
glfw.OPENGL_FORWARD_COMPAT = 0x00022006
glfw.OPENGL_DEBUG_CONTEXT = 0x00022007
glfw.OPENGL_PROFILE = 0x00022008
glfw.CONTEXT_RELEASE_BEHAVIOR = 0x00022009
glfw.CONTEXT_NO_ERROR = 0x0002200A
glfw.CONTEXT_CREATION_API = 0x0002200B
glfw.NO_API = 0
glfw.OPENGL_API = 0x00030001
glfw.OPENGL_ES_API = 0x00030002
glfw.NO_ROBUSTNESS = 0
glfw.NO_RESET_NOTIFICATION = 0x00031001
glfw.LOSE_CONTEXT_ON_RESET = 0x00031002
glfw.OPENGL_ANY_PROFILE = 0
glfw.OPENGL_CORE_PROFILE = 0x00032001
glfw.OPENGL_COMPAT_PROFILE = 0x00032002
glfw.CURSOR = 0x00033001
glfw.STICKY_KEYS = 0x00033002
glfw.STICKY_MOUSE_BUTTONS = 0x00033003
glfw.CURSOR_NORMAL = 0x00034001
glfw.CURSOR_HIDDEN = 0x00034002
glfw.CURSOR_DISABLED = 0x00034003
glfw.ANY_RELEASE_BEHAVIOR = 0
glfw.RELEASE_BEHAVIOR_FLUSH = 0x00035001
glfw.RELEASE_BEHAVIOR_NONE = 0x00035002
glfw.NATIVE_CONTEXT_API = 0x00036001
glfw.EGL_CONTEXT_API = 0x00036002
glfw.KEY_UNKNOWN = -1
glfw.KEY_SPACE = 32
glfw.KEY_APOSTROPHE = 39
glfw.KEY_COMMA = 44
glfw.KEY_MINUS = 45
glfw.KEY_PERIOD = 46
glfw.KEY_SLASH = 47
glfw.KEY_0 = 48
glfw.KEY_1 = 49
glfw.KEY_2 = 50
glfw.KEY_3 = 51
glfw.KEY_4 = 52
glfw.KEY_5 = 53
glfw.KEY_6 = 54
glfw.KEY_7 = 55
glfw.KEY_8 = 56
glfw.KEY_9 = 57
glfw.KEY_SEMICOLON = 59
glfw.KEY_EQUAL = 61
glfw.KEY_A = 65
glfw.KEY_B = 66
glfw.KEY_C = 67
glfw.KEY_D = 68
glfw.KEY_E = 69
glfw.KEY_F = 70
glfw.KEY_G = 71
glfw.KEY_H = 72
glfw.KEY_I = 73
glfw.KEY_J = 74
glfw.KEY_K = 75
glfw.KEY_L = 76
glfw.KEY_M = 77
glfw.KEY_N = 78
glfw.KEY_O = 79
glfw.KEY_P = 80
glfw.KEY_Q = 81
glfw.KEY_R = 82
glfw.KEY_S = 83
glfw.KEY_T = 84
glfw.KEY_U = 85
glfw.KEY_V = 86
glfw.KEY_W = 87
glfw.KEY_X = 88
glfw.KEY_Y = 89
glfw.KEY_Z = 90
glfw.KEY_LEFT_BRACKET = 91
glfw.KEY_BACKSLASH = 92
glfw.KEY_RIGHT_BRACKET = 93
glfw.KEY_GRAVE_ACCENT = 96
glfw.KEY_WORLD_1 = 161
glfw.KEY_WORLD_2 = 162
glfw.KEY_ESCAPE = 256
glfw.KEY_ENTER = 257
glfw.KEY_TAB = 258
glfw.KEY_BACKSPACE = 259
glfw.KEY_INSERT = 260
glfw.KEY_DELETE = 261
glfw.KEY_RIGHT = 262
glfw.KEY_LEFT = 263
glfw.KEY_DOWN = 264
glfw.KEY_UP = 265
glfw.KEY_PAGE_UP = 266
glfw.KEY_PAGE_DOWN = 267
glfw.KEY_HOME = 268
glfw.KEY_END = 269
glfw.KEY_CAPS_LOCK = 280
glfw.KEY_SCROLL_LOCK = 281
glfw.KEY_NUM_LOCK = 282
glfw.KEY_PRINT_SCREEN = 283
glfw.KEY_PAUSE = 284
glfw.KEY_F1 = 290
glfw.KEY_F2 = 291
glfw.KEY_F3 = 292
glfw.KEY_F4 = 293
glfw.KEY_F5 = 294
glfw.KEY_F6 = 295
glfw.KEY_F7 = 296
glfw.KEY_F8 = 297
glfw.KEY_F9 = 298
glfw.KEY_F10 = 299
glfw.KEY_F11 = 300
glfw.KEY_F12 = 301
glfw.KEY_F13 = 302
glfw.KEY_F14 = 303
glfw.KEY_F15 = 304
glfw.KEY_F16 = 305
glfw.KEY_F17 = 306
glfw.KEY_F18 = 307
glfw.KEY_F19 = 308
glfw.KEY_F20 = 309
glfw.KEY_F21 = 310
glfw.KEY_F22 = 311
glfw.KEY_F23 = 312
glfw.KEY_F24 = 313
glfw.KEY_F25 = 314
glfw.KEY_KP_0 = 320
glfw.KEY_KP_1 = 321
glfw.KEY_KP_2 = 322
glfw.KEY_KP_3 = 323
glfw.KEY_KP_4 = 324
glfw.KEY_KP_5 = 325
glfw.KEY_KP_6 = 326
glfw.KEY_KP_7 = 327
glfw.KEY_KP_8 = 328
glfw.KEY_KP_9 = 329
glfw.KEY_KP_DECIMAL = 330
glfw.KEY_KP_DIVIDE = 331
glfw.KEY_KP_MULTIPLY = 332
glfw.KEY_KP_SUBTRACT = 333
glfw.KEY_KP_ADD = 334
glfw.KEY_KP_ENTER = 335
glfw.KEY_KP_EQUAL = 336
glfw.KEY_LEFT_SHIFT = 340
glfw.KEY_LEFT_CONTROL = 341
glfw.KEY_LEFT_ALT = 342
glfw.KEY_LEFT_SUPER = 343
glfw.KEY_RIGHT_SHIFT = 344
glfw.KEY_RIGHT_CONTROL = 345
glfw.KEY_RIGHT_ALT = 346
glfw.KEY_RIGHT_SUPER = 347
glfw.KEY_MENU = 348
glfw.KEY_LAST = glfw.KEY_MENU
glfw.MOD_SHIFT = 0x0001
glfw.MOD_CONTROL = 0x0002
glfw.MOD_ALT = 0x0004
glfw.MOD_SUPER = 0x0008
glfw.MOUSE_BUTTON_1 = 0
glfw.MOUSE_BUTTON_2 = 1
glfw.MOUSE_BUTTON_3 = 2
glfw.MOUSE_BUTTON_4 = 3
glfw.MOUSE_BUTTON_5 = 4
glfw.MOUSE_BUTTON_6 = 5
glfw.MOUSE_BUTTON_7 = 6
glfw.MOUSE_BUTTON_8 = 7
glfw.MOUSE_BUTTON_LAST = glfw.MOUSE_BUTTON_8
glfw.MOUSE_BUTTON_LEFT = glfw.MOUSE_BUTTON_1
glfw.MOUSE_BUTTON_RIGHT = glfw.MOUSE_BUTTON_2
glfw.MOUSE_BUTTON_MIDDLE = glfw.MOUSE_BUTTON_3
glfw.RELEASE = 0
glfw.PRESS = 1
glfw.REPEAT = 2
glfw.FALSE = 0
glfw.TRUE = 1

module.exports = glfw