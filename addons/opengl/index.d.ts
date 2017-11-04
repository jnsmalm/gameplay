declare module "gameplay/opengl" {
  function activeTexture(texture: number): void
  function attachShader(program: number, shader: number): void
  function blendFunc(sfactor: number, dfactor: number): void
  function bufferData(
    target: number, srcData: ArrayBufferView, usage: number): void
  function bindBuffer(target: number, buffer: number): void
  function bindTexture(target: number, texture: number): void
  function bindVertexArray(vertexArray: number): void
  function clear(mask: number): void
  function clearColor(r: number, g: number, b: number, a: number): void
  function compileShader(shader: number): void
  function createBuffer(): number
  function createProgram(): number
  function createShader(shaderType: number): number
  function createTexture(): number
  function createVertexArray(): number
  function cullFace(mode: number): void
  function depthMask(flag: boolean): void
  function disable(cap: number): void
  function drawArrays(mode: number, first: number, count: number): void
  function drawElements(
    mode: number, count: number, type: number, offset: number): void
  function enable(cap: number): void
  function enableVertexAttribArray(index: number): void
  function frontFace(mode: number): void
  function getError(): number
  function getParameter(pname: number): number
  function getProgramInfoLog(program: number): string
  function getProgramParameter(program: number, pname: number): number
  function getShaderInfoLog(shader: number): string
  function getShaderParameter(shader: number, pname: number): number
  function getUniformLocation(program: number, name: string): number
  function init(): void
  function linkProgram(program: number): void
  function pixelStorei(pname: number, param: number): void
  function shaderSource(shader: number, source: string): void
  function texImage2D(target: number, level: number, internalFormat: number,
    width: number, height: number, border: number, format: number,
    type: number, data: ArrayBufferView | null): void
  function texSubImage2D(target: number, level: number, xoffset: number,
    yoffset: number, width: number, height: number, format: number,
    type: number, data: ArrayBufferView): void
  function texParameteri(target: number, pname: number, param: number): void
  function uniform1f(location: number, v0: number): void
  function uniform1i(location: number, v0: number): void
  function uniform3f(
    location: number, v0: number, v1: number, v2: number): void
  function uniformMatrix4fv(
    location: number, transpose: boolean, value: ArrayBufferView): void
  function useProgram(program: number): void
  function vertexAttribPointer(index: number, size: number, type: number,
    normalized: boolean, stride: number, offset: number): void
  function viewport(x: number, y: number, w: number, h: number): void

  const DEPTH_BUFFER_BIT: number
  const STENCIL_BUFFER_BIT: number
  const COLOR_BUFFER_BIT: number
  const FALSE: number
  const TRUE: number
  const POINTS: number
  const LINES: number
  const LINE_LOOP: number
  const LINE_STRIP: number
  const TRIANGLES: number
  const TRIANGLE_STRIP: number
  const TRIANGLE_FAN: number
  const QUADS: number
  const NEVER: number
  const LESS: number
  const EQUAL: number
  const LEQUAL: number
  const GREATER: number
  const NOTEQUAL: number
  const GEQUAL: number
  const ALWAYS: number
  const ZERO: number
  const ONE: number
  const SRC_COLOR: number
  const ONE_MINUS_SRC_COLOR: number
  const SRC_ALPHA: number
  const ONE_MINUS_SRC_ALPHA: number
  const DST_ALPHA: number
  const ONE_MINUS_DST_ALPHA: number
  const DST_COLOR: number
  const ONE_MINUS_DST_COLOR: number
  const SRC_ALPHA_SATURATE: number
  const NONE: number
  const FRONT_LEFT: number
  const FRONT_RIGHT: number
  const BACK_LEFT: number
  const BACK_RIGHT: number
  const FRONT: number
  const BACK: number
  const LEFT: number
  const RIGHT: number
  const FRONT_AND_BACK: number
  const NO_ERROR: number
  const INVALID_ENUM: number
  const INVALID_VALUE: number
  const INVALID_OPERATION: number
  const OUT_OF_MEMORY: number
  const CW: number
  const CCW: number
  const POINT_SIZE: number
  const POINT_SIZE_RANGE: number
  const POINT_SIZE_GRANULARITY: number
  const LINE_SMOOTH: number
  const LINE_WIDTH: number
  const LINE_WIDTH_RANGE: number
  const LINE_WIDTH_GRANULARITY: number
  const POLYGON_MODE: number
  const POLYGON_SMOOTH: number
  const CULL_FACE: number
  const CULL_FACE_MODE: number
  const FRONT_FACE: number
  const DEPTH_RANGE: number
  const DEPTH_TEST: number
  const DEPTH_WRITEMASK: number
  const DEPTH_CLEAR_VALUE: number
  const DEPTH_FUNC: number
  const STENCIL_TEST: number
  const STENCIL_CLEAR_VALUE: number
  const STENCIL_FUNC: number
  const STENCIL_VALUE_MASK: number
  const STENCIL_FAIL: number
  const STENCIL_PASS_DEPTH_FAIL: number
  const STENCIL_PASS_DEPTH_PASS: number
  const STENCIL_REF: number
  const STENCIL_WRITEMASK: number
  const VIEWPORT: number
  const DITHER: number
  const BLEND_DST: number
  const BLEND_SRC: number
  const BLEND: number
  const LOGIC_OP_MODE: number
  const COLOR_LOGIC_OP: number
  const DRAW_BUFFER: number
  const READ_BUFFER: number
  const SCISSOR_BOX: number
  const SCISSOR_TEST: number
  const COLOR_CLEAR_VALUE: number
  const COLOR_WRITEMASK: number
  const DOUBLEBUFFER: number
  const STEREO: number
  const LINE_SMOOTH_HINT: number
  const POLYGON_SMOOTH_HINT: number
  const UNPACK_SWAP_BYTES: number
  const UNPACK_LSB_FIRST: number
  const UNPACK_ROW_LENGTH: number
  const UNPACK_SKIP_ROWS: number
  const UNPACK_SKIP_PIXELS: number
  const UNPACK_ALIGNMENT: number
  const PACK_SWAP_BYTES: number
  const PACK_LSB_FIRST: number
  const PACK_ROW_LENGTH: number
  const PACK_SKIP_ROWS: number
  const PACK_SKIP_PIXELS: number
  const PACK_ALIGNMENT: number
  const MAX_TEXTURE_SIZE: number
  const MAX_VIEWPORT_DIMS: number
  const SUBPIXEL_BITS: number
  const TEXTURE_1D: number
  const TEXTURE_2D: number
  const POLYGON_OFFSET_UNITS: number
  const POLYGON_OFFSET_POINT: number
  const POLYGON_OFFSET_LINE: number
  const POLYGON_OFFSET_FILL: number
  const POLYGON_OFFSET_FACTOR: number
  const TEXTURE_BINDING_1D: number
  const TEXTURE_BINDING_2D: number
  const TEXTURE_WIDTH: number
  const TEXTURE_HEIGHT: number
  const TEXTURE_INTERNAL_FORMAT: number
  const TEXTURE_BORDER_COLOR: number
  const TEXTURE_RED_SIZE: number
  const TEXTURE_GREEN_SIZE: number
  const TEXTURE_BLUE_SIZE: number
  const TEXTURE_ALPHA_SIZE: number
  const DONT_CARE: number
  const FASTEST: number
  const NICEST: number
  const BYTE: number
  const UNSIGNED_BYTE: number
  const SHORT: number
  const UNSIGNED_SHORT: number
  const INT: number
  const UNSIGNED_INT: number
  const FLOAT: number
  const DOUBLE: number
  const STACK_OVERFLOW: number
  const STACK_UNDERFLOW: number
  const CLEAR: number
  const AND: number
  const AND_REVERSE: number
  const COPY: number
  const AND_INVERTED: number
  const NOOP: number
  const XOR: number
  const OR: number
  const NOR: number
  const EQUIV: number
  const INVERT: number
  const OR_REVERSE: number
  const COPY_INVERTED: number
  const OR_INVERTED: number
  const NAND: number
  const SET: number
  const TEXTURE: number
  const COLOR: number
  const DEPTH: number
  const STENCIL: number
  const STENCIL_INDEX: number
  const DEPTH_COMPONENT: number
  const RED: number
  const GREEN: number
  const BLUE: number
  const ALPHA: number
  const RGB: number
  const RGBA: number
  const POINT: number
  const LINE: number
  const FILL: number
  const KEEP: number
  const REPLACE: number
  const INCR: number
  const DECR: number
  const VENDOR: number
  const RENDERER: number
  const VERSION: number
  const EXTENSIONS: number
  const NEAREST: number
  const LINEAR: number
  const NEAREST_MIPMAP_NEAREST: number
  const LINEAR_MIPMAP_NEAREST: number
  const NEAREST_MIPMAP_LINEAR: number
  const LINEAR_MIPMAP_LINEAR: number
  const TEXTURE_MAG_FILTER: number
  const TEXTURE_MIN_FILTER: number
  const TEXTURE_WRAP_S: number
  const TEXTURE_WRAP_T: number
  const PROXY_TEXTURE_1D: number
  const PROXY_TEXTURE_2D: number
  const REPEAT: number
  const R3_G3_B2: number
  const RGB4: number
  const RGB5: number
  const RGB8: number
  const RGB10: number
  const RGB12: number
  const RGB16: number
  const RGBA2: number
  const RGBA4: number
  const RGB5_A1: number
  const RGBA8: number
  const RGB10_A2: number
  const RGBA12: number
  const RGBA16: number
  const VERTEX_ARRAY: number
  const UNSIGNED_BYTE_3_3_2: number
  const UNSIGNED_SHORT_4_4_4_4: number
  const UNSIGNED_SHORT_5_5_5_1: number
  const UNSIGNED_INT_8_8_8_8: number
  const UNSIGNED_INT_10_10_10_2: number
  const TEXTURE_BINDING_3D: number
  const PACK_SKIP_IMAGES: number
  const PACK_IMAGE_HEIGHT: number
  const UNPACK_SKIP_IMAGES: number
  const UNPACK_IMAGE_HEIGHT: number
  const TEXTURE_3D: number
  const PROXY_TEXTURE_3D: number
  const TEXTURE_DEPTH: number
  const TEXTURE_WRAP_R: number
  const MAX_3D_TEXTURE_SIZE: number
  const UNSIGNED_BYTE_2_3_3_REV: number
  const UNSIGNED_SHORT_5_6_5: number
  const UNSIGNED_SHORT_5_6_5_REV: number
  const UNSIGNED_SHORT_4_4_4_4_REV: number
  const UNSIGNED_SHORT_1_5_5_5_REV: number
  const UNSIGNED_INT_8_8_8_8_REV: number
  const UNSIGNED_INT_2_10_10_10_REV: number
  const BGR: number
  const BGRA: number
  const MAX_ELEMENTS_VERTICES: number
  const MAX_ELEMENTS_INDICES: number
  const CLAMP_TO_EDGE: number
  const TEXTURE_MIN_LOD: number
  const TEXTURE_MAX_LOD: number
  const TEXTURE_BASE_LEVEL: number
  const TEXTURE_MAX_LEVEL: number
  const SMOOTH_POINT_SIZE_RANGE: number
  const SMOOTH_POINT_SIZE_GRANULARITY: number
  const SMOOTH_LINE_WIDTH_RANGE: number
  const SMOOTH_LINE_WIDTH_GRANULARITY: number
  const ALIASED_LINE_WIDTH_RANGE: number
  const TEXTURE0: number
  const TEXTURE1: number
  const TEXTURE2: number
  const TEXTURE3: number
  const TEXTURE4: number
  const TEXTURE5: number
  const TEXTURE6: number
  const TEXTURE7: number
  const TEXTURE8: number
  const TEXTURE9: number
  const TEXTURE10: number
  const TEXTURE11: number
  const TEXTURE12: number
  const TEXTURE13: number
  const TEXTURE14: number
  const TEXTURE15: number
  const TEXTURE16: number
  const TEXTURE17: number
  const TEXTURE18: number
  const TEXTURE19: number
  const TEXTURE20: number
  const TEXTURE21: number
  const TEXTURE22: number
  const TEXTURE23: number
  const TEXTURE24: number
  const TEXTURE25: number
  const TEXTURE26: number
  const TEXTURE27: number
  const TEXTURE28: number
  const TEXTURE29: number
  const TEXTURE30: number
  const TEXTURE31: number
  const ACTIVE_TEXTURE: number
  const MULTISAMPLE: number
  const SAMPLE_ALPHA_TO_COVERAGE: number
  const SAMPLE_ALPHA_TO_ONE: number
  const SAMPLE_COVERAGE: number
  const SAMPLE_BUFFERS: number
  const SAMPLES: number
  const SAMPLE_COVERAGE_VALUE: number
  const SAMPLE_COVERAGE_INVERT: number
  const TEXTURE_CUBE_MAP: number
  const TEXTURE_BINDING_CUBE_MAP: number
  const TEXTURE_CUBE_MAP_POSITIVE_X: number
  const TEXTURE_CUBE_MAP_NEGATIVE_X: number
  const TEXTURE_CUBE_MAP_POSITIVE_Y: number
  const TEXTURE_CUBE_MAP_NEGATIVE_Y: number
  const TEXTURE_CUBE_MAP_POSITIVE_Z: number
  const TEXTURE_CUBE_MAP_NEGATIVE_Z: number
  const PROXY_TEXTURE_CUBE_MAP: number
  const MAX_CUBE_MAP_TEXTURE_SIZE: number
  const COMPRESSED_RGB: number
  const COMPRESSED_RGBA: number
  const TEXTURE_COMPRESSION_HINT: number
  const TEXTURE_COMPRESSED_IMAGE_SIZE: number
  const TEXTURE_COMPRESSED: number
  const NUM_COMPRESSED_TEXTURE_FORMATS: number
  const COMPRESSED_TEXTURE_FORMATS: number
  const CLAMP_TO_BORDER: number
  const BLEND_DST_RGB: number
  const BLEND_SRC_RGB: number
  const BLEND_DST_ALPHA: number
  const BLEND_SRC_ALPHA: number
  const POINT_FADE_THRESHOLD_SIZE: number
  const DEPTH_COMPONENT16: number
  const DEPTH_COMPONENT24: number
  const DEPTH_COMPONENT32: number
  const MIRRORED_REPEAT: number
  const MAX_TEXTURE_LOD_BIAS: number
  const TEXTURE_LOD_BIAS: number
  const INCR_WRAP: number
  const DECR_WRAP: number
  const TEXTURE_DEPTH_SIZE: number
  const TEXTURE_COMPARE_MODE: number
  const TEXTURE_COMPARE_FUNC: number
  const FUNC_ADD: number
  const FUNC_SUBTRACT: number
  const FUNC_REVERSE_SUBTRACT: number
  const MIN: number
  const MAX: number
  const CONSTANT_COLOR: number
  const ONE_MINUS_CONSTANT_COLOR: number
  const CONSTANT_ALPHA: number
  const ONE_MINUS_CONSTANT_ALPHA: number
  const BUFFER_SIZE: number
  const BUFFER_USAGE: number
  const QUERY_COUNTER_BITS: number
  const CURRENT_QUERY: number
  const QUERY_RESULT: number
  const QUERY_RESULT_AVAILABLE: number
  const ARRAY_BUFFER: number
  const ELEMENT_ARRAY_BUFFER: number
  const ARRAY_BUFFER_BINDING: number
  const ELEMENT_ARRAY_BUFFER_BINDING: number
  const VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number
  const READ_ONLY: number
  const WRITE_ONLY: number
  const READ_WRITE: number
  const BUFFER_ACCESS: number
  const BUFFER_MAPPED: number
  const BUFFER_MAP_POINTER: number
  const STREAM_DRAW: number
  const STREAM_READ: number
  const STREAM_COPY: number
  const STATIC_DRAW: number
  const STATIC_READ: number
  const STATIC_COPY: number
  const DYNAMIC_DRAW: number
  const DYNAMIC_READ: number
  const DYNAMIC_COPY: number
  const SAMPLES_PASSED: number
  const SRC1_ALPHA: number
  const BLEND_EQUATION_RGB: number
  const VERTEX_ATTRIB_ARRAY_ENABLED: number
  const VERTEX_ATTRIB_ARRAY_SIZE: number
  const VERTEX_ATTRIB_ARRAY_STRIDE: number
  const VERTEX_ATTRIB_ARRAY_TYPE: number
  const CURRENT_VERTEX_ATTRIB: number
  const VERTEX_PROGRAM_POINT_SIZE: number
  const VERTEX_ATTRIB_ARRAY_POINTER: number
  const STENCIL_BACK_FUNC: number
  const STENCIL_BACK_FAIL: number
  const STENCIL_BACK_PASS_DEPTH_FAIL: number
  const STENCIL_BACK_PASS_DEPTH_PASS: number
  const MAX_DRAW_BUFFERS: number
  const DRAW_BUFFER0: number
  const DRAW_BUFFER1: number
  const DRAW_BUFFER2: number
  const DRAW_BUFFER3: number
  const DRAW_BUFFER4: number
  const DRAW_BUFFER5: number
  const DRAW_BUFFER6: number
  const DRAW_BUFFER7: number
  const DRAW_BUFFER8: number
  const DRAW_BUFFER9: number
  const DRAW_BUFFER10: number
  const DRAW_BUFFER11: number
  const DRAW_BUFFER12: number
  const DRAW_BUFFER13: number
  const DRAW_BUFFER14: number
  const DRAW_BUFFER15: number
  const BLEND_EQUATION_ALPHA: number
  const MAX_VERTEX_ATTRIBS: number
  const VERTEX_ATTRIB_ARRAY_NORMALIZED: number
  const MAX_TEXTURE_IMAGE_UNITS: number
  const FRAGMENT_SHADER: number
  const VERTEX_SHADER: number
  const MAX_FRAGMENT_UNIFORM_COMPONENTS: number
  const MAX_VERTEX_UNIFORM_COMPONENTS: number
  const MAX_VARYING_FLOATS: number
  const MAX_VERTEX_TEXTURE_IMAGE_UNITS: number
  const MAX_COMBINED_TEXTURE_IMAGE_UNITS: number
  const SHADER_TYPE: number
  const FLOAT_VEC2: number
  const FLOAT_VEC3: number
  const FLOAT_VEC4: number
  const INT_VEC2: number
  const INT_VEC3: number
  const INT_VEC4: number
  const BOOL: number
  const BOOL_VEC2: number
  const BOOL_VEC3: number
  const BOOL_VEC4: number
  const FLOAT_MAT2: number
  const FLOAT_MAT3: number
  const FLOAT_MAT4: number
  const SAMPLER_1D: number
  const SAMPLER_2D: number
  const SAMPLER_3D: number
  const SAMPLER_CUBE: number
  const SAMPLER_1D_SHADOW: number
  const SAMPLER_2D_SHADOW: number
  const DELETE_STATUS: number
  const COMPILE_STATUS: number
  const LINK_STATUS: number
  const VALIDATE_STATUS: number
  const INFO_LOG_LENGTH: number
  const ATTACHED_SHADERS: number
  const ACTIVE_UNIFORMS: number
  const ACTIVE_UNIFORM_MAX_LENGTH: number
  const SHADER_SOURCE_LENGTH: number
  const ACTIVE_ATTRIBUTES: number
  const ACTIVE_ATTRIBUTE_MAX_LENGTH: number
  const FRAGMENT_SHADER_DERIVATIVE_HINT: number
  const SHADING_LANGUAGE_VERSION: number
  const CURRENT_PROGRAM: number
  const POINT_SPRITE_COORD_ORIGIN: number
  const LOWER_LEFT: number
  const UPPER_LEFT: number
  const STENCIL_BACK_REF: number
  const STENCIL_BACK_VALUE_MASK: number
  const STENCIL_BACK_WRITEMASK: number
  const PIXEL_PACK_BUFFER: number
  const PIXEL_UNPACK_BUFFER: number
  const PIXEL_PACK_BUFFER_BINDING: number
  const PIXEL_UNPACK_BUFFER_BINDING: number
  const FLOAT_MAT2x3: number
  const FLOAT_MAT2x4: number
  const FLOAT_MAT3x2: number
  const FLOAT_MAT3x4: number
  const FLOAT_MAT4x2: number
  const FLOAT_MAT4x3: number
  const SRGB: number
  const SRGB8: number
  const SRGB_ALPHA: number
  const SRGB8_ALPHA8: number
  const COMPRESSED_SRGB: number
  const COMPRESSED_SRGB_ALPHA: number
  const COMPARE_REF_TO_TEXTURE: number
  const CLIP_DISTANCE0: number
  const CLIP_DISTANCE1: number
  const CLIP_DISTANCE2: number
  const CLIP_DISTANCE3: number
  const CLIP_DISTANCE4: number
  const CLIP_DISTANCE5: number
  const CLIP_DISTANCE6: number
  const CLIP_DISTANCE7: number
  const MAX_CLIP_DISTANCES: number
  const MAJOR_VERSION: number
  const MINOR_VERSION: number
  const NUM_EXTENSIONS: number
  const CONTEXT_FLAGS: number
  const COMPRESSED_RED: number
  const COMPRESSED_RG: number
  const CONTEXT_FLAG_FORWARD_COMPATIBLE_BIT: number
  const RGBA32F: number
  const RGB32F: number
  const RGBA16F: number
  const RGB16F: number
  const VERTEX_ATTRIB_ARRAY_INTEGER: number
  const MAX_ARRAY_TEXTURE_LAYERS: number
  const MIN_PROGRAM_TEXEL_OFFSET: number
  const MAX_PROGRAM_TEXEL_OFFSET: number
  const CLAMP_READ_COLOR: number
  const FIXED_ONLY: number
  const MAX_VARYING_COMPONENTS: number
  const TEXTURE_1D_ARRAY: number
  const PROXY_TEXTURE_1D_ARRAY: number
  const TEXTURE_2D_ARRAY: number
  const PROXY_TEXTURE_2D_ARRAY: number
  const TEXTURE_BINDING_1D_ARRAY: number
  const TEXTURE_BINDING_2D_ARRAY: number
  const R11F_G11F_B10F: number
  const UNSIGNED_INT_10F_11F_11F_REV: number
  const RGB9_E5: number
  const UNSIGNED_INT_5_9_9_9_REV: number
  const TEXTURE_SHARED_SIZE: number
  const TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH: number
  const TRANSFORM_FEEDBACK_BUFFER_MODE: number
  const MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: number
  const TRANSFORM_FEEDBACK_VARYINGS: number
  const TRANSFORM_FEEDBACK_BUFFER_START: number
  const TRANSFORM_FEEDBACK_BUFFER_SIZE: number
  const PRIMITIVES_GENERATED: number
  const TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: number
  const RASTERIZER_DISCARD: number
  const MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: number
  const MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: number
  const INTERLEAVED_ATTRIBS: number
  const SEPARATE_ATTRIBS: number
  const TRANSFORM_FEEDBACK_BUFFER: number
  const TRANSFORM_FEEDBACK_BUFFER_BINDING: number
  const RGBA32UI: number
  const RGB32UI: number
  const RGBA16UI: number
  const RGB16UI: number
  const RGBA8UI: number
  const RGB8UI: number
  const RGBA32I: number
  const RGB32I: number
  const RGBA16I: number
  const RGB16I: number
  const RGBA8I: number
  const RGB8I: number
  const RED_INTEGER: number
  const GREEN_INTEGER: number
  const BLUE_INTEGER: number
  const RGB_INTEGER: number
  const RGBA_INTEGER: number
  const BGR_INTEGER: number
  const BGRA_INTEGER: number
  const SAMPLER_1D_ARRAY: number
  const SAMPLER_2D_ARRAY: number
  const SAMPLER_1D_ARRAY_SHADOW: number
  const SAMPLER_2D_ARRAY_SHADOW: number
  const SAMPLER_CUBE_SHADOW: number
  const UNSIGNED_INT_VEC2: number
  const UNSIGNED_INT_VEC3: number
  const UNSIGNED_INT_VEC4: number
  const INT_SAMPLER_1D: number
  const INT_SAMPLER_2D: number
  const INT_SAMPLER_3D: number
  const INT_SAMPLER_CUBE: number
  const INT_SAMPLER_1D_ARRAY: number
  const INT_SAMPLER_2D_ARRAY: number
  const UNSIGNED_INT_SAMPLER_1D: number
  const UNSIGNED_INT_SAMPLER_2D: number
  const UNSIGNED_INT_SAMPLER_3D: number
  const UNSIGNED_INT_SAMPLER_CUBE: number
  const UNSIGNED_INT_SAMPLER_1D_ARRAY: number
  const QUERY_WAIT: number
  const QUERY_NO_WAIT: number
  const QUERY_BY_REGION_WAIT: number
  const QUERY_BY_REGION_NO_WAIT: number
  const BUFFER_ACCESS_FLAGS: number
  const BUFFER_MAP_LENGTH: number
  const BUFFER_MAP_OFFSET: number
  const DEPTH_COMPONENT32F: number
  const DEPTH32F_STENCIL8: number
  const FLOAT_32_UNSIGNED_INT_24_8_REV: number
  const INVALID_FRAMEBUFFER_OPERATION: number
  const FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: number
  const FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: number
  const FRAMEBUFFER_ATTACHMENT_RED_SIZE: number
  const FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: number
  const FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: number
  const FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: number
  const FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: number
  const FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: number
  const FRAMEBUFFER_DEFAULT: number
  const FRAMEBUFFER_UNDEFINED: number
  const DEPTH_STENCIL_ATTACHMENT: number
  const MAX_RENDERBUFFER_SIZE: number
  const DEPTH_STENCIL: number
  const UNSIGNED_INT_24_8: number
  const DEPTH24_STENCIL8: number
  const TEXTURE_STENCIL_SIZE: number
  const TEXTURE_RED_TYPE: number
  const TEXTURE_GREEN_TYPE: number
  const TEXTURE_BLUE_TYPE: number
  const TEXTURE_ALPHA_TYPE: number
  const TEXTURE_DEPTH_TYPE: number
  const UNSIGNED_NORMALIZED: number
  const FRAMEBUFFER_BINDING: number
  const DRAW_FRAMEBUFFER_BINDING: number
  const RENDERBUFFER_BINDING: number
  const READ_FRAMEBUFFER: number
  const DRAW_FRAMEBUFFER: number
  const READ_FRAMEBUFFER_BINDING: number
  const RENDERBUFFER_SAMPLES: number
  const FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number
  const FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number
  const FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number
  const FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: number
  const FRAMEBUFFER_COMPLETE: number
  const FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number
  const FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number
  const FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER: number
  const FRAMEBUFFER_INCOMPLETE_READ_BUFFER: number
  const FRAMEBUFFER_UNSUPPORTED: number
  const MAX_COLOR_ATTACHMENTS: number
  const COLOR_ATTACHMENT0: number
  const COLOR_ATTACHMENT1: number
  const COLOR_ATTACHMENT2: number
  const COLOR_ATTACHMENT3: number
  const COLOR_ATTACHMENT4: number
  const COLOR_ATTACHMENT5: number
  const COLOR_ATTACHMENT6: number
  const COLOR_ATTACHMENT7: number
  const COLOR_ATTACHMENT8: number
  const COLOR_ATTACHMENT9: number
  const COLOR_ATTACHMENT10: number
  const COLOR_ATTACHMENT11: number
  const COLOR_ATTACHMENT12: number
  const COLOR_ATTACHMENT13: number
  const COLOR_ATTACHMENT14: number
  const COLOR_ATTACHMENT15: number
  const COLOR_ATTACHMENT16: number
  const COLOR_ATTACHMENT17: number
  const COLOR_ATTACHMENT18: number
  const COLOR_ATTACHMENT19: number
  const COLOR_ATTACHMENT20: number
  const COLOR_ATTACHMENT21: number
  const COLOR_ATTACHMENT22: number
  const COLOR_ATTACHMENT23: number
  const COLOR_ATTACHMENT24: number
  const COLOR_ATTACHMENT25: number
  const COLOR_ATTACHMENT26: number
  const COLOR_ATTACHMENT27: number
  const COLOR_ATTACHMENT28: number
  const COLOR_ATTACHMENT29: number
  const COLOR_ATTACHMENT30: number
  const COLOR_ATTACHMENT31: number
  const DEPTH_ATTACHMENT: number
  const STENCIL_ATTACHMENT: number
  const FRAMEBUFFER: number
  const RENDERBUFFER: number
  const RENDERBUFFER_WIDTH: number
  const RENDERBUFFER_HEIGHT: number
  const RENDERBUFFER_INTERNAL_FORMAT: number
  const STENCIL_INDEX1: number
  const STENCIL_INDEX4: number
  const STENCIL_INDEX8: number
  const STENCIL_INDEX16: number
  const RENDERBUFFER_RED_SIZE: number
  const RENDERBUFFER_GREEN_SIZE: number
  const RENDERBUFFER_BLUE_SIZE: number
  const RENDERBUFFER_ALPHA_SIZE: number
  const RENDERBUFFER_DEPTH_SIZE: number
  const RENDERBUFFER_STENCIL_SIZE: number
  const FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: number
  const MAX_SAMPLES: number
  const FRAMEBUFFER_SRGB: number
  const HALF_FLOAT: number
  const MAP_READ_BIT: number
  const MAP_WRITE_BIT: number
  const MAP_INVALIDATE_RANGE_BIT: number
  const MAP_INVALIDATE_BUFFER_BIT: number
  const MAP_FLUSH_EXPLICIT_BIT: number
  const MAP_UNSYNCHRONIZED_BIT: number
  const COMPRESSED_RED_RGTC1: number
  const COMPRESSED_SIGNED_RED_RGTC1: number
  const COMPRESSED_RG_RGTC2: number
  const COMPRESSED_SIGNED_RG_RGTC2: number
  const RG: number
  const RG_INTEGER: number
  const R8: number
  const R16: number
  const RG8: number
  const RG16: number
  const R16F: number
  const R32F: number
  const RG16F: number
  const RG32F: number
  const R8I: number
  const R8UI: number
  const R16I: number
  const R16UI: number
  const R32I: number
  const R32UI: number
  const RG8I: number
  const RG8UI: number
  const RG16I: number
  const RG16UI: number
  const RG32I: number
  const RG32UI: number
  const VERTEX_ARRAY_BINDING: number
  const SAMPLER_2D_RECT: number
  const SAMPLER_2D_RECT_SHADOW: number
  const SAMPLER_BUFFER: number
  const INT_SAMPLER_2D_RECT: number
  const INT_SAMPLER_BUFFER: number
  const UNSIGNED_INT_SAMPLER_2D_RECT: number
  const UNSIGNED_INT_SAMPLER_BUFFER: number
  const TEXTURE_BUFFER: number
  const MAX_TEXTURE_BUFFER_SIZE: number
  const TEXTURE_BINDING_BUFFER: number
  const TEXTURE_BUFFER_DATA_STORE_BINDING: number
  const TEXTURE_RECTANGLE: number
  const TEXTURE_BINDING_RECTANGLE: number
  const PROXY_TEXTURE_RECTANGLE: number
  const MAX_RECTANGLE_TEXTURE_SIZE: number
  const R8_SNORM: number
  const RG8_SNORM: number
  const RGB8_SNORM: number
  const RGBA8_SNORM: number
  const R16_SNORM: number
  const RG16_SNORM: number
  const RGB16_SNORM: number
  const RGBA16_SNORM: number
  const SIGNED_NORMALIZED: number
  const PRIMITIVE_RESTART: number
  const PRIMITIVE_RESTART_INDEX: number
  const COPY_READ_BUFFER: number
  const COPY_WRITE_BUFFER: number
  const UNIFORM_BUFFER: number
  const UNIFORM_BUFFER_BINDING: number
  const UNIFORM_BUFFER_START: number
  const UNIFORM_BUFFER_SIZE: number
  const MAX_VERTEX_UNIFORM_BLOCKS: number
  const MAX_GEOMETRY_UNIFORM_BLOCKS: number
  const MAX_FRAGMENT_UNIFORM_BLOCKS: number
  const MAX_COMBINED_UNIFORM_BLOCKS: number
  const MAX_UNIFORM_BUFFER_BINDINGS: number
  const MAX_UNIFORM_BLOCK_SIZE: number
  const MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: number
  const MAX_COMBINED_GEOMETRY_UNIFORM_COMPONENTS: number
  const MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: number
  const UNIFORM_BUFFER_OFFSET_ALIGNMENT: number
  const ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH: number
  const ACTIVE_UNIFORM_BLOCKS: number
  const UNIFORM_TYPE: number
  const UNIFORM_SIZE: number
  const UNIFORM_NAME_LENGTH: number
  const UNIFORM_BLOCK_INDEX: number
  const UNIFORM_OFFSET: number
  const UNIFORM_ARRAY_STRIDE: number
  const UNIFORM_MATRIX_STRIDE: number
  const UNIFORM_IS_ROW_MAJOR: number
  const UNIFORM_BLOCK_BINDING: number
  const UNIFORM_BLOCK_DATA_SIZE: number
  const UNIFORM_BLOCK_NAME_LENGTH: number
  const UNIFORM_BLOCK_ACTIVE_UNIFORMS: number
  const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: number
  const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: number
  const UNIFORM_BLOCK_REFERENCED_BY_GEOMETRY_SHADER: number
  const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: number
  const INVALID_INDEX: number
  const CONTEXT_CORE_PROFILE_BIT: number
  const CONTEXT_COMPATIBILITY_PROFILE_BIT: number
  const LINES_ADJACENCY: number
  const LINE_STRIP_ADJACENCY: number
  const TRIANGLES_ADJACENCY: number
  const TRIANGLE_STRIP_ADJACENCY: number
  const PROGRAM_POINT_SIZE: number
  const MAX_GEOMETRY_TEXTURE_IMAGE_UNITS: number
  const FRAMEBUFFER_ATTACHMENT_LAYERED: number
  const FRAMEBUFFER_INCOMPLETE_LAYER_TARGETS: number
  const GEOMETRY_SHADER: number
  const GEOMETRY_VERTICES_OUT: number
  const GEOMETRY_INPUT_TYPE: number
  const GEOMETRY_OUTPUT_TYPE: number
  const MAX_GEOMETRY_UNIFORM_COMPONENTS: number
  const MAX_GEOMETRY_OUTPUT_VERTICES: number
  const MAX_GEOMETRY_TOTAL_OUTPUT_COMPONENTS: number
  const MAX_VERTEX_OUTPUT_COMPONENTS: number
  const MAX_GEOMETRY_INPUT_COMPONENTS: number
  const MAX_GEOMETRY_OUTPUT_COMPONENTS: number
  const MAX_FRAGMENT_INPUT_COMPONENTS: number
  const CONTEXT_PROFILE_MASK: number
  const DEPTH_CLAMP: number
  const QUADS_FOLLOW_PROVOKING_VERTEX_CONVENTION: number
  const FIRST_VERTEX_CONVENTION: number
  const LAST_VERTEX_CONVENTION: number
  const PROVOKING_VERTEX: number
  const TEXTURE_CUBE_MAP_SEAMLESS: number
  const MAX_SERVER_WAIT_TIMEOUT: number
  const OBJECT_TYPE: number
  const SYNC_CONDITION: number
  const SYNC_STATUS: number
  const SYNC_FLAGS: number
  const SYNC_FENCE: number
  const SYNC_GPU_COMMANDS_COMPLETE: number
  const UNSIGNALED: number
  const SIGNALED: number
  const ALREADY_SIGNALED: number
  const TIMEOUT_EXPIRED: number
  const CONDITION_SATISFIED: number
  const WAIT_FAILED: number
  const TIMEOUT_IGNORED: number
  const SYNC_FLUSH_COMMANDS_BIT: number
  const SAMPLE_POSITION: number
  const SAMPLE_MASK: number
  const SAMPLE_MASK_VALUE: number
  const MAX_SAMPLE_MASK_WORDS: number
  const TEXTURE_2D_MULTISAMPLE: number
  const PROXY_TEXTURE_2D_MULTISAMPLE: number
  const TEXTURE_2D_MULTISAMPLE_ARRAY: number
  const PROXY_TEXTURE_2D_MULTISAMPLE_ARRAY: number
  const TEXTURE_BINDING_2D_MULTISAMPLE: number
  const TEXTURE_BINDING_2D_MULTISAMPLE_ARRAY: number
  const TEXTURE_SAMPLES: number
  const TEXTURE_FIXED_SAMPLE_LOCATIONS: number
  const SAMPLER_2D_MULTISAMPLE: number
  const INT_SAMPLER_2D_MULTISAMPLE: number
  const UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE: number
  const SAMPLER_2D_MULTISAMPLE_ARRAY: number
  const INT_SAMPLER_2D_MULTISAMPLE_ARRAY: number
  const UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE_ARRAY: number
  const MAX_COLOR_TEXTURE_SAMPLES: number
  const MAX_DEPTH_TEXTURE_SAMPLES: number
  const MAX_INTEGER_SAMPLES: number
  const VERTEX_ATTRIB_ARRAY_DIVISOR: number
  const SRC1_COLOR: number
  const ONE_MINUS_SRC1_COLOR: number
  const ONE_MINUS_SRC1_ALPHA: number
  const MAX_DUAL_SOURCE_DRAW_BUFFERS: number
  const ANY_SAMPLES_PASSED: number
  const SAMPLER_BINDING: number
  const RGB10_A2UI: number
  const TEXTURE_SWIZZLE_R: number
  const TEXTURE_SWIZZLE_G: number
  const TEXTURE_SWIZZLE_B: number
  const TEXTURE_SWIZZLE_A: number
  const TEXTURE_SWIZZLE_RGBA: number
  const TIME_ELAPSED: number
  const TIMESTAMP: number
  const INT_2_10_10_10_REV: number
  const SAMPLE_SHADING: number
  const MIN_SAMPLE_SHADING_VALUE: number
  const MIN_PROGRAM_TEXTURE_GATHER_OFFSET: number
  const MAX_PROGRAM_TEXTURE_GATHER_OFFSET: number
  const TEXTURE_CUBE_MAP_ARRAY: number
  const TEXTURE_BINDING_CUBE_MAP_ARRAY: number
  const PROXY_TEXTURE_CUBE_MAP_ARRAY: number
  const SAMPLER_CUBE_MAP_ARRAY: number
  const SAMPLER_CUBE_MAP_ARRAY_SHADOW: number
  const INT_SAMPLER_CUBE_MAP_ARRAY: number
  const UNSIGNED_INT_SAMPLER_CUBE_MAP_ARRAY: number
  const DRAW_INDIRECT_BUFFER: number
  const DRAW_INDIRECT_BUFFER_BINDING: number
  const GEOMETRY_SHADER_INVOCATIONS: number
  const MAX_GEOMETRY_SHADER_INVOCATIONS: number
  const MIN_FRAGMENT_INTERPOLATION_OFFSET: number
  const MAX_FRAGMENT_INTERPOLATION_OFFSET: number
  const FRAGMENT_INTERPOLATION_OFFSET_BITS: number
  const MAX_VERTEX_STREAMS: number
  const DOUBLE_VEC2: number
  const DOUBLE_VEC3: number
  const DOUBLE_VEC4: number
  const DOUBLE_MAT2: number
  const DOUBLE_MAT3: number
  const DOUBLE_MAT4: number
  const DOUBLE_MAT2x3: number
  const DOUBLE_MAT2x4: number
  const DOUBLE_MAT3x2: number
  const DOUBLE_MAT3x4: number
  const DOUBLE_MAT4x2: number
  const DOUBLE_MAT4x3: number
  const ACTIVE_SUBROUTINES: number
  const ACTIVE_SUBROUTINE_UNIFORMS: number
  const ACTIVE_SUBROUTINE_UNIFORM_LOCATIONS: number
  const ACTIVE_SUBROUTINE_MAX_LENGTH: number
  const ACTIVE_SUBROUTINE_UNIFORM_MAX_LENGTH: number
  const MAX_SUBROUTINES: number
  const MAX_SUBROUTINE_UNIFORM_LOCATIONS: number
  const NUM_COMPATIBLE_SUBROUTINES: number
  const COMPATIBLE_SUBROUTINES: number
  const PATCHES: number
  const PATCH_VERTICES: number
  const PATCH_DEFAULT_INNER_LEVEL: number
  const PATCH_DEFAULT_OUTER_LEVEL: number
  const TESS_CONTROL_OUTPUT_VERTICES: number
  const TESS_GEN_MODE: number
  const TESS_GEN_SPACING: number
  const TESS_GEN_VERTEX_ORDER: number
  const TESS_GEN_POINT_MODE: number
  const ISOLINES: number
  const FRACTIONAL_ODD: number
  const FRACTIONAL_EVEN: number
  const MAX_PATCH_VERTICES: number
  const MAX_TESS_GEN_LEVEL: number
  const MAX_TESS_CONTROL_UNIFORM_COMPONENTS: number
  const MAX_TESS_EVALUATION_UNIFORM_COMPONENTS: number
  const MAX_TESS_CONTROL_TEXTURE_IMAGE_UNITS: number
  const MAX_TESS_EVALUATION_TEXTURE_IMAGE_UNITS: number
  const MAX_TESS_CONTROL_OUTPUT_COMPONENTS: number
  const MAX_TESS_PATCH_COMPONENTS: number
  const MAX_TESS_CONTROL_TOTAL_OUTPUT_COMPONENTS: number
  const MAX_TESS_EVALUATION_OUTPUT_COMPONENTS: number
  const MAX_TESS_CONTROL_UNIFORM_BLOCKS: number
  const MAX_TESS_EVALUATION_UNIFORM_BLOCKS: number
  const MAX_TESS_CONTROL_INPUT_COMPONENTS: number
  const MAX_TESS_EVALUATION_INPUT_COMPONENTS: number
  const MAX_COMBINED_TESS_CONTROL_UNIFORM_COMPONENTS: number
  const MAX_COMBINED_TESS_EVALUATION_UNIFORM_COMPONENTS: number
  const UNIFORM_BLOCK_REFERENCED_BY_TESS_CONTROL_SHADER: number
  const UNIFORM_BLOCK_REFERENCED_BY_TESS_EVALUATION_SHADER: number
  const TESS_EVALUATION_SHADER: number
  const TESS_CONTROL_SHADER: number
  const TRANSFORM_FEEDBACK: number
  const TRANSFORM_FEEDBACK_BUFFER_PAUSED: number
  const TRANSFORM_FEEDBACK_BUFFER_ACTIVE: number
  const TRANSFORM_FEEDBACK_BINDING: number
  const MAX_TRANSFORM_FEEDBACK_BUFFERS: number
}