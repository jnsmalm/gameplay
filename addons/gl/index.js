const gl = require("./gl")

gl.DEPTH_BUFFER_BIT = 0x00000100
gl.STENCIL_BUFFER_BIT = 0x00000400
gl.COLOR_BUFFER_BIT = 0x00004000
gl.FALSE = 0
gl.TRUE = 1
gl.POINTS = 0x0000
gl.LINES = 0x0001
gl.LINE_LOOP = 0x0002
gl.LINE_STRIP = 0x0003
gl.TRIANGLES = 0x0004
gl.TRIANGLE_STRIP = 0x0005
gl.TRIANGLE_FAN = 0x0006
gl.QUADS = 0x0007
gl.NEVER = 0x0200
gl.LESS = 0x0201
gl.EQUAL = 0x0202
gl.LEQUAL = 0x0203
gl.GREATER = 0x0204
gl.NOTEQUAL = 0x0205
gl.GEQUAL = 0x0206
gl.ALWAYS = 0x0207
gl.ZERO = 0
gl.ONE = 1
gl.SRC_COLOR = 0x0300
gl.ONE_MINUS_SRC_COLOR = 0x0301
gl.SRC_ALPHA = 0x0302
gl.ONE_MINUS_SRC_ALPHA = 0x0303
gl.DST_ALPHA = 0x0304
gl.ONE_MINUS_DST_ALPHA = 0x0305
gl.DST_COLOR = 0x0306
gl.ONE_MINUS_DST_COLOR = 0x0307
gl.SRC_ALPHA_SATURATE = 0x0308
gl.NONE = 0
gl.FRONT_LEFT = 0x0400
gl.FRONT_RIGHT = 0x0401
gl.BACK_LEFT = 0x0402
gl.BACK_RIGHT = 0x0403
gl.FRONT = 0x0404
gl.BACK = 0x0405
gl.LEFT = 0x0406
gl.RIGHT = 0x0407
gl.FRONT_AND_BACK = 0x0408
gl.NO_ERROR = 0
gl.INVALID_ENUM = 0x0500
gl.INVALID_VALUE = 0x0501
gl.INVALID_OPERATION = 0x0502
gl.OUT_OF_MEMORY = 0x0505
gl.CW = 0x0900
gl.CCW = 0x0901
gl.POINT_SIZE = 0x0B11
gl.POINT_SIZE_RANGE = 0x0B12
gl.POINT_SIZE_GRANULARITY = 0x0B13
gl.LINE_SMOOTH = 0x0B20
gl.LINE_WIDTH = 0x0B21
gl.LINE_WIDTH_RANGE = 0x0B22
gl.LINE_WIDTH_GRANULARITY = 0x0B23
gl.POLYGON_MODE = 0x0B40
gl.POLYGON_SMOOTH = 0x0B41
gl.CULL_FACE = 0x0B44
gl.CULL_FACE_MODE = 0x0B45
gl.FRONT_FACE = 0x0B46
gl.DEPTH_RANGE = 0x0B70
gl.DEPTH_TEST = 0x0B71
gl.DEPTH_WRITEMASK = 0x0B72
gl.DEPTH_CLEAR_VALUE = 0x0B73
gl.DEPTH_FUNC = 0x0B74
gl.STENCIL_TEST = 0x0B90
gl.STENCIL_CLEAR_VALUE = 0x0B91
gl.STENCIL_FUNC = 0x0B92
gl.STENCIL_VALUE_MASK = 0x0B93
gl.STENCIL_FAIL = 0x0B94
gl.STENCIL_PASS_DEPTH_FAIL = 0x0B95
gl.STENCIL_PASS_DEPTH_PASS = 0x0B96
gl.STENCIL_REF = 0x0B97
gl.STENCIL_WRITEMASK = 0x0B98
gl.VIEWPORT = 0x0BA2
gl.DITHER = 0x0BD0
gl.BLEND_DST = 0x0BE0
gl.BLEND_SRC = 0x0BE1
gl.BLEND = 0x0BE2
gl.LOGIC_OP_MODE = 0x0BF0
gl.COLOR_LOGIC_OP = 0x0BF2
gl.DRAW_BUFFER = 0x0C01
gl.READ_BUFFER = 0x0C02
gl.SCISSOR_BOX = 0x0C10
gl.SCISSOR_TEST = 0x0C11
gl.COLOR_CLEAR_VALUE = 0x0C22
gl.COLOR_WRITEMASK = 0x0C23
gl.DOUBLEBUFFER = 0x0C32
gl.STEREO = 0x0C33
gl.LINE_SMOOTH_HINT = 0x0C52
gl.POLYGON_SMOOTH_HINT = 0x0C53
gl.UNPACK_SWAP_BYTES = 0x0CF0
gl.UNPACK_LSB_FIRST = 0x0CF1
gl.UNPACK_ROW_LENGTH = 0x0CF2
gl.UNPACK_SKIP_ROWS = 0x0CF3
gl.UNPACK_SKIP_PIXELS = 0x0CF4
gl.UNPACK_ALIGNMENT = 0x0CF5
gl.PACK_SWAP_BYTES = 0x0D00
gl.PACK_LSB_FIRST = 0x0D01
gl.PACK_ROW_LENGTH = 0x0D02
gl.PACK_SKIP_ROWS = 0x0D03
gl.PACK_SKIP_PIXELS = 0x0D04
gl.PACK_ALIGNMENT = 0x0D05
gl.MAX_TEXTURE_SIZE = 0x0D33
gl.MAX_VIEWPORT_DIMS = 0x0D3A
gl.SUBPIXEL_BITS = 0x0D50
gl.TEXTURE_1D = 0x0DE0
gl.TEXTURE_2D = 0x0DE1
gl.POLYGON_OFFSET_UNITS = 0x2A00
gl.POLYGON_OFFSET_POINT = 0x2A01
gl.POLYGON_OFFSET_LINE = 0x2A02
gl.POLYGON_OFFSET_FILL = 0x8037
gl.POLYGON_OFFSET_FACTOR = 0x8038
gl.TEXTURE_BINDING_1D = 0x8068
gl.TEXTURE_BINDING_2D = 0x8069
gl.TEXTURE_WIDTH = 0x1000
gl.TEXTURE_HEIGHT = 0x1001
gl.TEXTURE_INTERNAL_FORMAT = 0x1003
gl.TEXTURE_BORDER_COLOR = 0x1004
gl.TEXTURE_RED_SIZE = 0x805C
gl.TEXTURE_GREEN_SIZE = 0x805D
gl.TEXTURE_BLUE_SIZE = 0x805E
gl.TEXTURE_ALPHA_SIZE = 0x805F
gl.DONT_CARE = 0x1100
gl.FASTEST = 0x1101
gl.NICEST = 0x1102
gl.BYTE = 0x1400
gl.UNSIGNED_BYTE = 0x1401
gl.SHORT = 0x1402
gl.UNSIGNED_SHORT = 0x1403
gl.INT = 0x1404
gl.UNSIGNED_INT = 0x1405
gl.FLOAT = 0x1406
gl.DOUBLE = 0x140A
gl.STACK_OVERFLOW = 0x0503
gl.STACK_UNDERFLOW = 0x0504
gl.CLEAR = 0x1500
gl.AND = 0x1501
gl.AND_REVERSE = 0x1502
gl.COPY = 0x1503
gl.AND_INVERTED = 0x1504
gl.NOOP = 0x1505
gl.XOR = 0x1506
gl.OR = 0x1507
gl.NOR = 0x1508
gl.EQUIV = 0x1509
gl.INVERT = 0x150A
gl.OR_REVERSE = 0x150B
gl.COPY_INVERTED = 0x150C
gl.OR_INVERTED = 0x150D
gl.NAND = 0x150E
gl.SET = 0x150F
gl.TEXTURE = 0x1702
gl.COLOR = 0x1800
gl.DEPTH = 0x1801
gl.STENCIL = 0x1802
gl.STENCIL_INDEX = 0x1901
gl.DEPTH_COMPONENT = 0x1902
gl.RED = 0x1903
gl.GREEN = 0x1904
gl.BLUE = 0x1905
gl.ALPHA = 0x1906
gl.RGB = 0x1907
gl.RGBA = 0x1908
gl.POINT = 0x1B00
gl.LINE = 0x1B01
gl.FILL = 0x1B02
gl.KEEP = 0x1E00
gl.REPLACE = 0x1E01
gl.INCR = 0x1E02
gl.DECR = 0x1E03
gl.VENDOR = 0x1F00
gl.RENDERER = 0x1F01
gl.VERSION = 0x1F02
gl.EXTENSIONS = 0x1F03
gl.NEAREST = 0x2600
gl.LINEAR = 0x2601
gl.NEAREST_MIPMAP_NEAREST = 0x2700
gl.LINEAR_MIPMAP_NEAREST = 0x2701
gl.NEAREST_MIPMAP_LINEAR = 0x2702
gl.LINEAR_MIPMAP_LINEAR = 0x2703
gl.TEXTURE_MAG_FILTER = 0x2800
gl.TEXTURE_MIN_FILTER = 0x2801
gl.TEXTURE_WRAP_S = 0x2802
gl.TEXTURE_WRAP_T = 0x2803
gl.PROXY_TEXTURE_1D = 0x8063
gl.PROXY_TEXTURE_2D = 0x8064
gl.REPEAT = 0x2901
gl.R3_G3_B2 = 0x2A10
gl.RGB4 = 0x804F
gl.RGB5 = 0x8050
gl.RGB8 = 0x8051
gl.RGB10 = 0x8052
gl.RGB12 = 0x8053
gl.RGB16 = 0x8054
gl.RGBA2 = 0x8055
gl.RGBA4 = 0x8056
gl.RGB5_A1 = 0x8057
gl.RGBA8 = 0x8058
gl.RGB10_A2 = 0x8059
gl.RGBA12 = 0x805A
gl.RGBA16 = 0x805B
gl.VERTEX_ARRAY = 0x8074
gl.UNSIGNED_BYTE_3_3_2 = 0x8032
gl.UNSIGNED_SHORT_4_4_4_4 = 0x8033
gl.UNSIGNED_SHORT_5_5_5_1 = 0x8034
gl.UNSIGNED_INT_8_8_8_8 = 0x8035
gl.UNSIGNED_INT_10_10_10_2 = 0x8036
gl.TEXTURE_BINDING_3D = 0x806A
gl.PACK_SKIP_IMAGES = 0x806B
gl.PACK_IMAGE_HEIGHT = 0x806C
gl.UNPACK_SKIP_IMAGES = 0x806D
gl.UNPACK_IMAGE_HEIGHT = 0x806E
gl.TEXTURE_3D = 0x806F
gl.PROXY_TEXTURE_3D = 0x8070
gl.TEXTURE_DEPTH = 0x8071
gl.TEXTURE_WRAP_R = 0x8072
gl.MAX_3D_TEXTURE_SIZE = 0x8073
gl.UNSIGNED_BYTE_2_3_3_REV = 0x8362
gl.UNSIGNED_SHORT_5_6_5 = 0x8363
gl.UNSIGNED_SHORT_5_6_5_REV = 0x8364
gl.UNSIGNED_SHORT_4_4_4_4_REV = 0x8365
gl.UNSIGNED_SHORT_1_5_5_5_REV = 0x8366
gl.UNSIGNED_INT_8_8_8_8_REV = 0x8367
gl.UNSIGNED_INT_2_10_10_10_REV = 0x8368
gl.BGR = 0x80E0
gl.BGRA = 0x80E1
gl.MAX_ELEMENTS_VERTICES = 0x80E8
gl.MAX_ELEMENTS_INDICES = 0x80E9
gl.CLAMP_TO_EDGE = 0x812F
gl.TEXTURE_MIN_LOD = 0x813A
gl.TEXTURE_MAX_LOD = 0x813B
gl.TEXTURE_BASE_LEVEL = 0x813C
gl.TEXTURE_MAX_LEVEL = 0x813D
gl.SMOOTH_POINT_SIZE_RANGE = 0x0B12
gl.SMOOTH_POINT_SIZE_GRANULARITY = 0x0B13
gl.SMOOTH_LINE_WIDTH_RANGE = 0x0B22
gl.SMOOTH_LINE_WIDTH_GRANULARITY = 0x0B23
gl.ALIASED_LINE_WIDTH_RANGE = 0x846E
gl.TEXTURE0 = 0x84C0
gl.TEXTURE1 = 0x84C1
gl.TEXTURE2 = 0x84C2
gl.TEXTURE3 = 0x84C3
gl.TEXTURE4 = 0x84C4
gl.TEXTURE5 = 0x84C5
gl.TEXTURE6 = 0x84C6
gl.TEXTURE7 = 0x84C7
gl.TEXTURE8 = 0x84C8
gl.TEXTURE9 = 0x84C9
gl.TEXTURE10 = 0x84CA
gl.TEXTURE11 = 0x84CB
gl.TEXTURE12 = 0x84CC
gl.TEXTURE13 = 0x84CD
gl.TEXTURE14 = 0x84CE
gl.TEXTURE15 = 0x84CF
gl.TEXTURE16 = 0x84D0
gl.TEXTURE17 = 0x84D1
gl.TEXTURE18 = 0x84D2
gl.TEXTURE19 = 0x84D3
gl.TEXTURE20 = 0x84D4
gl.TEXTURE21 = 0x84D5
gl.TEXTURE22 = 0x84D6
gl.TEXTURE23 = 0x84D7
gl.TEXTURE24 = 0x84D8
gl.TEXTURE25 = 0x84D9
gl.TEXTURE26 = 0x84DA
gl.TEXTURE27 = 0x84DB
gl.TEXTURE28 = 0x84DC
gl.TEXTURE29 = 0x84DD
gl.TEXTURE30 = 0x84DE
gl.TEXTURE31 = 0x84DF
gl.ACTIVE_TEXTURE = 0x84E0
gl.MULTISAMPLE = 0x809D
gl.SAMPLE_ALPHA_TO_COVERAGE = 0x809E
gl.SAMPLE_ALPHA_TO_ONE = 0x809F
gl.SAMPLE_COVERAGE = 0x80A0
gl.SAMPLE_BUFFERS = 0x80A8
gl.SAMPLES = 0x80A9
gl.SAMPLE_COVERAGE_VALUE = 0x80AA
gl.SAMPLE_COVERAGE_INVERT = 0x80AB
gl.TEXTURE_CUBE_MAP = 0x8513
gl.TEXTURE_BINDING_CUBE_MAP = 0x8514
gl.TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515
gl.TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516
gl.TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517
gl.TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518
gl.TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519
gl.TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A
gl.PROXY_TEXTURE_CUBE_MAP = 0x851B
gl.MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C
gl.COMPRESSED_RGB = 0x84ED
gl.COMPRESSED_RGBA = 0x84EE
gl.TEXTURE_COMPRESSION_HINT = 0x84EF
gl.TEXTURE_COMPRESSED_IMAGE_SIZE = 0x86A0
gl.TEXTURE_COMPRESSED = 0x86A1
gl.NUM_COMPRESSED_TEXTURE_FORMATS = 0x86A2
gl.COMPRESSED_TEXTURE_FORMATS = 0x86A3
gl.CLAMP_TO_BORDER = 0x812D
gl.BLEND_DST_RGB = 0x80C8
gl.BLEND_SRC_RGB = 0x80C9
gl.BLEND_DST_ALPHA = 0x80CA
gl.BLEND_SRC_ALPHA = 0x80CB
gl.POINT_FADE_THRESHOLD_SIZE = 0x8128
gl.DEPTH_COMPONENT16 = 0x81A5
gl.DEPTH_COMPONENT24 = 0x81A6
gl.DEPTH_COMPONENT32 = 0x81A7
gl.MIRRORED_REPEAT = 0x8370
gl.MAX_TEXTURE_LOD_BIAS = 0x84FD
gl.TEXTURE_LOD_BIAS = 0x8501
gl.INCR_WRAP = 0x8507
gl.DECR_WRAP = 0x8508
gl.TEXTURE_DEPTH_SIZE = 0x884A
gl.TEXTURE_COMPARE_MODE = 0x884C
gl.TEXTURE_COMPARE_FUNC = 0x884D
gl.FUNC_ADD = 0x8006
gl.FUNC_SUBTRACT = 0x800A
gl.FUNC_REVERSE_SUBTRACT = 0x800B
gl.MIN = 0x8007
gl.MAX = 0x8008
gl.CONSTANT_COLOR = 0x8001
gl.ONE_MINUS_CONSTANT_COLOR = 0x8002
gl.CONSTANT_ALPHA = 0x8003
gl.ONE_MINUS_CONSTANT_ALPHA = 0x8004
gl.BUFFER_SIZE = 0x8764
gl.BUFFER_USAGE = 0x8765
gl.QUERY_COUNTER_BITS = 0x8864
gl.CURRENT_QUERY = 0x8865
gl.QUERY_RESULT = 0x8866
gl.QUERY_RESULT_AVAILABLE = 0x8867
gl.ARRAY_BUFFER = 0x8892
gl.ELEMENT_ARRAY_BUFFER = 0x8893
gl.ARRAY_BUFFER_BINDING = 0x8894
gl.ELEMENT_ARRAY_BUFFER_BINDING = 0x8895
gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F
gl.READ_ONLY = 0x88B8
gl.WRITE_ONLY = 0x88B9
gl.READ_WRITE = 0x88BA
gl.BUFFER_ACCESS = 0x88BB
gl.BUFFER_MAPPED = 0x88BC
gl.BUFFER_MAP_POINTER = 0x88BD
gl.STREAM_DRAW = 0x88E0
gl.STREAM_READ = 0x88E1
gl.STREAM_COPY = 0x88E2
gl.STATIC_DRAW = 0x88E4
gl.STATIC_READ = 0x88E5
gl.STATIC_COPY = 0x88E6
gl.DYNAMIC_DRAW = 0x88E8
gl.DYNAMIC_READ = 0x88E9
gl.DYNAMIC_COPY = 0x88EA
gl.SAMPLES_PASSED = 0x8914
gl.SRC1_ALPHA = 0x8589
gl.BLEND_EQUATION_RGB = 0x8009
gl.VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622
gl.VERTEX_ATTRIB_ARRAY_SIZE = 0x8623
gl.VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624
gl.VERTEX_ATTRIB_ARRAY_TYPE = 0x8625
gl.CURRENT_VERTEX_ATTRIB = 0x8626
gl.VERTEX_PROGRAM_POINT_SIZE = 0x8642
gl.VERTEX_ATTRIB_ARRAY_POINTER = 0x8645
gl.STENCIL_BACK_FUNC = 0x8800
gl.STENCIL_BACK_FAIL = 0x8801
gl.STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802
gl.STENCIL_BACK_PASS_DEPTH_PASS = 0x8803
gl.MAX_DRAW_BUFFERS = 0x8824
gl.DRAW_BUFFER0 = 0x8825
gl.DRAW_BUFFER1 = 0x8826
gl.DRAW_BUFFER2 = 0x8827
gl.DRAW_BUFFER3 = 0x8828
gl.DRAW_BUFFER4 = 0x8829
gl.DRAW_BUFFER5 = 0x882A
gl.DRAW_BUFFER6 = 0x882B
gl.DRAW_BUFFER7 = 0x882C
gl.DRAW_BUFFER8 = 0x882D
gl.DRAW_BUFFER9 = 0x882E
gl.DRAW_BUFFER10 = 0x882F
gl.DRAW_BUFFER11 = 0x8830
gl.DRAW_BUFFER12 = 0x8831
gl.DRAW_BUFFER13 = 0x8832
gl.DRAW_BUFFER14 = 0x8833
gl.DRAW_BUFFER15 = 0x8834
gl.BLEND_EQUATION_ALPHA = 0x883D
gl.MAX_VERTEX_ATTRIBS = 0x8869
gl.VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A
gl.MAX_TEXTURE_IMAGE_UNITS = 0x8872
gl.FRAGMENT_SHADER = 0x8B30
gl.VERTEX_SHADER = 0x8B31
gl.MAX_FRAGMENT_UNIFORM_COMPONENTS = 0x8B49
gl.MAX_VERTEX_UNIFORM_COMPONENTS = 0x8B4A
gl.MAX_VARYING_FLOATS = 0x8B4B
gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C
gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D
gl.SHADER_TYPE = 0x8B4F
gl.FLOAT_VEC2 = 0x8B50
gl.FLOAT_VEC3 = 0x8B51
gl.FLOAT_VEC4 = 0x8B52
gl.INT_VEC2 = 0x8B53
gl.INT_VEC3 = 0x8B54
gl.INT_VEC4 = 0x8B55
gl.BOOL = 0x8B56
gl.BOOL_VEC2 = 0x8B57
gl.BOOL_VEC3 = 0x8B58
gl.BOOL_VEC4 = 0x8B59
gl.FLOAT_MAT2 = 0x8B5A
gl.FLOAT_MAT3 = 0x8B5B
gl.FLOAT_MAT4 = 0x8B5C
gl.SAMPLER_1D = 0x8B5D
gl.SAMPLER_2D = 0x8B5E
gl.SAMPLER_3D = 0x8B5F
gl.SAMPLER_CUBE = 0x8B60
gl.SAMPLER_1D_SHADOW = 0x8B61
gl.SAMPLER_2D_SHADOW = 0x8B62
gl.DELETE_STATUS = 0x8B80
gl.COMPILE_STATUS = 0x8B81
gl.LINK_STATUS = 0x8B82
gl.VALIDATE_STATUS = 0x8B83
gl.INFO_LOG_LENGTH = 0x8B84
gl.ATTACHED_SHADERS = 0x8B85
gl.ACTIVE_UNIFORMS = 0x8B86
gl.ACTIVE_UNIFORM_MAX_LENGTH = 0x8B87
gl.SHADER_SOURCE_LENGTH = 0x8B88
gl.ACTIVE_ATTRIBUTES = 0x8B89
gl.ACTIVE_ATTRIBUTE_MAX_LENGTH = 0x8B8A
gl.FRAGMENT_SHADER_DERIVATIVE_HINT = 0x8B8B
gl.SHADING_LANGUAGE_VERSION = 0x8B8C
gl.CURRENT_PROGRAM = 0x8B8D
gl.POINT_SPRITE_COORD_ORIGIN = 0x8CA0
gl.LOWER_LEFT = 0x8CA1
gl.UPPER_LEFT = 0x8CA2
gl.STENCIL_BACK_REF = 0x8CA3
gl.STENCIL_BACK_VALUE_MASK = 0x8CA4
gl.STENCIL_BACK_WRITEMASK = 0x8CA5
gl.PIXEL_PACK_BUFFER = 0x88EB
gl.PIXEL_UNPACK_BUFFER = 0x88EC
gl.PIXEL_PACK_BUFFER_BINDING = 0x88ED
gl.PIXEL_UNPACK_BUFFER_BINDING = 0x88EF
gl.FLOAT_MAT2x3 = 0x8B65
gl.FLOAT_MAT2x4 = 0x8B66
gl.FLOAT_MAT3x2 = 0x8B67
gl.FLOAT_MAT3x4 = 0x8B68
gl.FLOAT_MAT4x2 = 0x8B69
gl.FLOAT_MAT4x3 = 0x8B6A
gl.SRGB = 0x8C40
gl.SRGB8 = 0x8C41
gl.SRGB_ALPHA = 0x8C42
gl.SRGB8_ALPHA8 = 0x8C43
gl.COMPRESSED_SRGB = 0x8C48
gl.COMPRESSED_SRGB_ALPHA = 0x8C49
gl.COMPARE_REF_TO_TEXTURE = 0x884E
gl.CLIP_DISTANCE0 = 0x3000
gl.CLIP_DISTANCE1 = 0x3001
gl.CLIP_DISTANCE2 = 0x3002
gl.CLIP_DISTANCE3 = 0x3003
gl.CLIP_DISTANCE4 = 0x3004
gl.CLIP_DISTANCE5 = 0x3005
gl.CLIP_DISTANCE6 = 0x3006
gl.CLIP_DISTANCE7 = 0x3007
gl.MAX_CLIP_DISTANCES = 0x0D32
gl.MAJOR_VERSION = 0x821B
gl.MINOR_VERSION = 0x821C
gl.NUM_EXTENSIONS = 0x821D
gl.CONTEXT_FLAGS = 0x821E
gl.COMPRESSED_RED = 0x8225
gl.COMPRESSED_RG = 0x8226
gl.CONTEXT_FLAG_FORWARD_COMPATIBLE_BIT = 0x00000001
gl.RGBA32F = 0x8814
gl.RGB32F = 0x8815
gl.RGBA16F = 0x881A
gl.RGB16F = 0x881B
gl.VERTEX_ATTRIB_ARRAY_INTEGER = 0x88FD
gl.MAX_ARRAY_TEXTURE_LAYERS = 0x88FF
gl.MIN_PROGRAM_TEXEL_OFFSET = 0x8904
gl.MAX_PROGRAM_TEXEL_OFFSET = 0x8905
gl.CLAMP_READ_COLOR = 0x891C
gl.FIXED_ONLY = 0x891D
gl.MAX_VARYING_COMPONENTS = 0x8B4B
gl.TEXTURE_1D_ARRAY = 0x8C18
gl.PROXY_TEXTURE_1D_ARRAY = 0x8C19
gl.TEXTURE_2D_ARRAY = 0x8C1A
gl.PROXY_TEXTURE_2D_ARRAY = 0x8C1B
gl.TEXTURE_BINDING_1D_ARRAY = 0x8C1C
gl.TEXTURE_BINDING_2D_ARRAY = 0x8C1D
gl.R11F_G11F_B10F = 0x8C3A
gl.UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B
gl.RGB9_E5 = 0x8C3D
gl.UNSIGNED_INT_5_9_9_9_REV = 0x8C3E
gl.TEXTURE_SHARED_SIZE = 0x8C3F
gl.TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH = 0x8C76
gl.TRANSFORM_FEEDBACK_BUFFER_MODE = 0x8C7F
gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 0x8C80
gl.TRANSFORM_FEEDBACK_VARYINGS = 0x8C83
gl.TRANSFORM_FEEDBACK_BUFFER_START = 0x8C84
gl.TRANSFORM_FEEDBACK_BUFFER_SIZE = 0x8C85
gl.PRIMITIVES_GENERATED = 0x8C87
gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 0x8C88
gl.RASTERIZER_DISCARD = 0x8C89
gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 0x8C8A
gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 0x8C8B
gl.INTERLEAVED_ATTRIBS = 0x8C8C
gl.SEPARATE_ATTRIBS = 0x8C8D
gl.TRANSFORM_FEEDBACK_BUFFER = 0x8C8E
gl.TRANSFORM_FEEDBACK_BUFFER_BINDING = 0x8C8F
gl.RGBA32UI = 0x8D70
gl.RGB32UI = 0x8D71
gl.RGBA16UI = 0x8D76
gl.RGB16UI = 0x8D77
gl.RGBA8UI = 0x8D7C
gl.RGB8UI = 0x8D7D
gl.RGBA32I = 0x8D82
gl.RGB32I = 0x8D83
gl.RGBA16I = 0x8D88
gl.RGB16I = 0x8D89
gl.RGBA8I = 0x8D8E
gl.RGB8I = 0x8D8F
gl.RED_INTEGER = 0x8D94
gl.GREEN_INTEGER = 0x8D95
gl.BLUE_INTEGER = 0x8D96
gl.RGB_INTEGER = 0x8D98
gl.RGBA_INTEGER = 0x8D99
gl.BGR_INTEGER = 0x8D9A
gl.BGRA_INTEGER = 0x8D9B
gl.SAMPLER_1D_ARRAY = 0x8DC0
gl.SAMPLER_2D_ARRAY = 0x8DC1
gl.SAMPLER_1D_ARRAY_SHADOW = 0x8DC3
gl.SAMPLER_2D_ARRAY_SHADOW = 0x8DC4
gl.SAMPLER_CUBE_SHADOW = 0x8DC5
gl.UNSIGNED_INT_VEC2 = 0x8DC6
gl.UNSIGNED_INT_VEC3 = 0x8DC7
gl.UNSIGNED_INT_VEC4 = 0x8DC8
gl.INT_SAMPLER_1D = 0x8DC9
gl.INT_SAMPLER_2D = 0x8DCA
gl.INT_SAMPLER_3D = 0x8DCB
gl.INT_SAMPLER_CUBE = 0x8DCC
gl.INT_SAMPLER_1D_ARRAY = 0x8DCE
gl.INT_SAMPLER_2D_ARRAY = 0x8DCF
gl.UNSIGNED_INT_SAMPLER_1D = 0x8DD1
gl.UNSIGNED_INT_SAMPLER_2D = 0x8DD2
gl.UNSIGNED_INT_SAMPLER_3D = 0x8DD3
gl.UNSIGNED_INT_SAMPLER_CUBE = 0x8DD4
gl.UNSIGNED_INT_SAMPLER_1D_ARRAY = 0x8DD7
gl.QUERY_WAIT = 0x8E13
gl.QUERY_NO_WAIT = 0x8E14
gl.QUERY_BY_REGION_WAIT = 0x8E15
gl.QUERY_BY_REGION_NO_WAIT = 0x8E16
gl.BUFFER_ACCESS_FLAGS = 0x911F
gl.BUFFER_MAP_LENGTH = 0x9120
gl.BUFFER_MAP_OFFSET = 0x9121
gl.DEPTH_COMPONENT32F = 0x8CAC
gl.DEPTH32F_STENCIL8 = 0x8CAD
gl.FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD
gl.INVALID_FRAMEBUFFER_OPERATION = 0x0506
gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 0x8210
gl.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 0x8211
gl.FRAMEBUFFER_ATTACHMENT_RED_SIZE = 0x8212
gl.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 0x8213
gl.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 0x8214
gl.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 0x8215
gl.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 0x8216
gl.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 0x8217
gl.FRAMEBUFFER_DEFAULT = 0x8218
gl.FRAMEBUFFER_UNDEFINED = 0x8219
gl.DEPTH_STENCIL_ATTACHMENT = 0x821A
gl.MAX_RENDERBUFFER_SIZE = 0x84E8
gl.DEPTH_STENCIL = 0x84F9
gl.UNSIGNED_INT_24_8 = 0x84FA
gl.DEPTH24_STENCIL8 = 0x88F0
gl.TEXTURE_STENCIL_SIZE = 0x88F1
gl.TEXTURE_RED_TYPE = 0x8C10
gl.TEXTURE_GREEN_TYPE = 0x8C11
gl.TEXTURE_BLUE_TYPE = 0x8C12
gl.TEXTURE_ALPHA_TYPE = 0x8C13
gl.TEXTURE_DEPTH_TYPE = 0x8C16
gl.UNSIGNED_NORMALIZED = 0x8C17
gl.FRAMEBUFFER_BINDING = 0x8CA6
gl.DRAW_FRAMEBUFFER_BINDING = 0x8CA6
gl.RENDERBUFFER_BINDING = 0x8CA7
gl.READ_FRAMEBUFFER = 0x8CA8
gl.DRAW_FRAMEBUFFER = 0x8CA9
gl.READ_FRAMEBUFFER_BINDING = 0x8CAA
gl.RENDERBUFFER_SAMPLES = 0x8CAB
gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD1
gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2
gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3
gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 0x8CD4
gl.FRAMEBUFFER_COMPLETE = 0x8CD5
gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6
gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7
gl.FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER = 0x8CDB
gl.FRAMEBUFFER_INCOMPLETE_READ_BUFFER = 0x8CDC
gl.FRAMEBUFFER_UNSUPPORTED = 0x8CDD
gl.MAX_COLOR_ATTACHMENTS = 0x8CDF
gl.COLOR_ATTACHMENT0 = 0x8CE0
gl.COLOR_ATTACHMENT1 = 0x8CE1
gl.COLOR_ATTACHMENT2 = 0x8CE2
gl.COLOR_ATTACHMENT3 = 0x8CE3
gl.COLOR_ATTACHMENT4 = 0x8CE4
gl.COLOR_ATTACHMENT5 = 0x8CE5
gl.COLOR_ATTACHMENT6 = 0x8CE6
gl.COLOR_ATTACHMENT7 = 0x8CE7
gl.COLOR_ATTACHMENT8 = 0x8CE8
gl.COLOR_ATTACHMENT9 = 0x8CE9
gl.COLOR_ATTACHMENT10 = 0x8CEA
gl.COLOR_ATTACHMENT11 = 0x8CEB
gl.COLOR_ATTACHMENT12 = 0x8CEC
gl.COLOR_ATTACHMENT13 = 0x8CED
gl.COLOR_ATTACHMENT14 = 0x8CEE
gl.COLOR_ATTACHMENT15 = 0x8CEF
gl.COLOR_ATTACHMENT16 = 0x8CF0
gl.COLOR_ATTACHMENT17 = 0x8CF1
gl.COLOR_ATTACHMENT18 = 0x8CF2
gl.COLOR_ATTACHMENT19 = 0x8CF3
gl.COLOR_ATTACHMENT20 = 0x8CF4
gl.COLOR_ATTACHMENT21 = 0x8CF5
gl.COLOR_ATTACHMENT22 = 0x8CF6
gl.COLOR_ATTACHMENT23 = 0x8CF7
gl.COLOR_ATTACHMENT24 = 0x8CF8
gl.COLOR_ATTACHMENT25 = 0x8CF9
gl.COLOR_ATTACHMENT26 = 0x8CFA
gl.COLOR_ATTACHMENT27 = 0x8CFB
gl.COLOR_ATTACHMENT28 = 0x8CFC
gl.COLOR_ATTACHMENT29 = 0x8CFD
gl.COLOR_ATTACHMENT30 = 0x8CFE
gl.COLOR_ATTACHMENT31 = 0x8CFF
gl.DEPTH_ATTACHMENT = 0x8D00
gl.STENCIL_ATTACHMENT = 0x8D20
gl.FRAMEBUFFER = 0x8D40
gl.RENDERBUFFER = 0x8D41
gl.RENDERBUFFER_WIDTH = 0x8D42
gl.RENDERBUFFER_HEIGHT = 0x8D43
gl.RENDERBUFFER_INTERNAL_FORMAT = 0x8D44
gl.STENCIL_INDEX1 = 0x8D46
gl.STENCIL_INDEX4 = 0x8D47
gl.STENCIL_INDEX8 = 0x8D48
gl.STENCIL_INDEX16 = 0x8D49
gl.RENDERBUFFER_RED_SIZE = 0x8D50
gl.RENDERBUFFER_GREEN_SIZE = 0x8D51
gl.RENDERBUFFER_BLUE_SIZE = 0x8D52
gl.RENDERBUFFER_ALPHA_SIZE = 0x8D53
gl.RENDERBUFFER_DEPTH_SIZE = 0x8D54
gl.RENDERBUFFER_STENCIL_SIZE = 0x8D55
gl.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 0x8D56
gl.MAX_SAMPLES = 0x8D57
gl.FRAMEBUFFER_SRGB = 0x8DB9
gl.HALF_FLOAT = 0x140B
gl.MAP_READ_BIT = 0x0001
gl.MAP_WRITE_BIT = 0x0002
gl.MAP_INVALIDATE_RANGE_BIT = 0x0004
gl.MAP_INVALIDATE_BUFFER_BIT = 0x0008
gl.MAP_FLUSH_EXPLICIT_BIT = 0x0010
gl.MAP_UNSYNCHRONIZED_BIT = 0x0020
gl.COMPRESSED_RED_RGTC1 = 0x8DBB
gl.COMPRESSED_SIGNED_RED_RGTC1 = 0x8DBC
gl.COMPRESSED_RG_RGTC2 = 0x8DBD
gl.COMPRESSED_SIGNED_RG_RGTC2 = 0x8DBE
gl.RG = 0x8227
gl.RG_INTEGER = 0x8228
gl.R8 = 0x8229
gl.R16 = 0x822A
gl.RG8 = 0x822B
gl.RG16 = 0x822C
gl.R16F = 0x822D
gl.R32F = 0x822E
gl.RG16F = 0x822F
gl.RG32F = 0x8230
gl.R8I = 0x8231
gl.R8UI = 0x8232
gl.R16I = 0x8233
gl.R16UI = 0x8234
gl.R32I = 0x8235
gl.R32UI = 0x8236
gl.RG8I = 0x8237
gl.RG8UI = 0x8238
gl.RG16I = 0x8239
gl.RG16UI = 0x823A
gl.RG32I = 0x823B
gl.RG32UI = 0x823C
gl.VERTEX_ARRAY_BINDING = 0x85B5
gl.SAMPLER_2D_RECT = 0x8B63
gl.SAMPLER_2D_RECT_SHADOW = 0x8B64
gl.SAMPLER_BUFFER = 0x8DC2
gl.INT_SAMPLER_2D_RECT = 0x8DCD
gl.INT_SAMPLER_BUFFER = 0x8DD0
gl.UNSIGNED_INT_SAMPLER_2D_RECT = 0x8DD5
gl.UNSIGNED_INT_SAMPLER_BUFFER = 0x8DD8
gl.TEXTURE_BUFFER = 0x8C2A
gl.MAX_TEXTURE_BUFFER_SIZE = 0x8C2B
gl.TEXTURE_BINDING_BUFFER = 0x8C2C
gl.TEXTURE_BUFFER_DATA_STORE_BINDING = 0x8C2D
gl.TEXTURE_RECTANGLE = 0x84F5
gl.TEXTURE_BINDING_RECTANGLE = 0x84F6
gl.PROXY_TEXTURE_RECTANGLE = 0x84F7
gl.MAX_RECTANGLE_TEXTURE_SIZE = 0x84F8
gl.R8_SNORM = 0x8F94
gl.RG8_SNORM = 0x8F95
gl.RGB8_SNORM = 0x8F96
gl.RGBA8_SNORM = 0x8F97
gl.R16_SNORM = 0x8F98
gl.RG16_SNORM = 0x8F99
gl.RGB16_SNORM = 0x8F9A
gl.RGBA16_SNORM = 0x8F9B
gl.SIGNED_NORMALIZED = 0x8F9C
gl.PRIMITIVE_RESTART = 0x8F9D
gl.PRIMITIVE_RESTART_INDEX = 0x8F9E
gl.COPY_READ_BUFFER = 0x8F36
gl.COPY_WRITE_BUFFER = 0x8F37
gl.UNIFORM_BUFFER = 0x8A11
gl.UNIFORM_BUFFER_BINDING = 0x8A28
gl.UNIFORM_BUFFER_START = 0x8A29
gl.UNIFORM_BUFFER_SIZE = 0x8A2A
gl.MAX_VERTEX_UNIFORM_BLOCKS = 0x8A2B
gl.MAX_GEOMETRY_UNIFORM_BLOCKS = 0x8A2C
gl.MAX_FRAGMENT_UNIFORM_BLOCKS = 0x8A2D
gl.MAX_COMBINED_UNIFORM_BLOCKS = 0x8A2E
gl.MAX_UNIFORM_BUFFER_BINDINGS = 0x8A2F
gl.MAX_UNIFORM_BLOCK_SIZE = 0x8A30
gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = 0x8A31
gl.MAX_COMBINED_GEOMETRY_UNIFORM_COMPONENTS = 0x8A32
gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = 0x8A33
gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT = 0x8A34
gl.ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH = 0x8A35
gl.ACTIVE_UNIFORM_BLOCKS = 0x8A36
gl.UNIFORM_TYPE = 0x8A37
gl.UNIFORM_SIZE = 0x8A38
gl.UNIFORM_NAME_LENGTH = 0x8A39
gl.UNIFORM_BLOCK_INDEX = 0x8A3A
gl.UNIFORM_OFFSET = 0x8A3B
gl.UNIFORM_ARRAY_STRIDE = 0x8A3C
gl.UNIFORM_MATRIX_STRIDE = 0x8A3D
gl.UNIFORM_IS_ROW_MAJOR = 0x8A3E
gl.UNIFORM_BLOCK_BINDING = 0x8A3F
gl.UNIFORM_BLOCK_DATA_SIZE = 0x8A40
gl.UNIFORM_BLOCK_NAME_LENGTH = 0x8A41
gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS = 0x8A42
gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 0x8A43
gl.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 0x8A44
gl.UNIFORM_BLOCK_REFERENCED_BY_GEOMETRY_SHADER = 0x8A45
gl.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8A46
gl.INVALID_INDEX = 0xFFFFFFFF
gl.CONTEXT_CORE_PROFILE_BIT = 0x00000001
gl.CONTEXT_COMPATIBILITY_PROFILE_BIT = 0x00000002
gl.LINES_ADJACENCY = 0x000A
gl.LINE_STRIP_ADJACENCY = 0x000B
gl.TRIANGLES_ADJACENCY = 0x000C
gl.TRIANGLE_STRIP_ADJACENCY = 0x000D
gl.PROGRAM_POINT_SIZE = 0x8642
gl.MAX_GEOMETRY_TEXTURE_IMAGE_UNITS = 0x8C29
gl.FRAMEBUFFER_ATTACHMENT_LAYERED = 0x8DA7
gl.FRAMEBUFFER_INCOMPLETE_LAYER_TARGETS = 0x8DA8
gl.GEOMETRY_SHADER = 0x8DD9
gl.GEOMETRY_VERTICES_OUT = 0x8916
gl.GEOMETRY_INPUT_TYPE = 0x8917
gl.GEOMETRY_OUTPUT_TYPE = 0x8918
gl.MAX_GEOMETRY_UNIFORM_COMPONENTS = 0x8DDF
gl.MAX_GEOMETRY_OUTPUT_VERTICES = 0x8DE0
gl.MAX_GEOMETRY_TOTAL_OUTPUT_COMPONENTS = 0x8DE1
gl.MAX_VERTEX_OUTPUT_COMPONENTS = 0x9122
gl.MAX_GEOMETRY_INPUT_COMPONENTS = 0x9123
gl.MAX_GEOMETRY_OUTPUT_COMPONENTS = 0x9124
gl.MAX_FRAGMENT_INPUT_COMPONENTS = 0x9125
gl.CONTEXT_PROFILE_MASK = 0x9126
gl.DEPTH_CLAMP = 0x864F
gl.QUADS_FOLLOW_PROVOKING_VERTEX_CONVENTION = 0x8E4C
gl.FIRST_VERTEX_CONVENTION = 0x8E4D
gl.LAST_VERTEX_CONVENTION = 0x8E4E
gl.PROVOKING_VERTEX = 0x8E4F
gl.TEXTURE_CUBE_MAP_SEAMLESS = 0x884F
gl.MAX_SERVER_WAIT_TIMEOUT = 0x9111
gl.OBJECT_TYPE = 0x9112
gl.SYNC_CONDITION = 0x9113
gl.SYNC_STATUS = 0x9114
gl.SYNC_FLAGS = 0x9115
gl.SYNC_FENCE = 0x9116
gl.SYNC_GPU_COMMANDS_COMPLETE = 0x9117
gl.UNSIGNALED = 0x9118
gl.SIGNALED = 0x9119
gl.ALREADY_SIGNALED = 0x911A
gl.TIMEOUT_EXPIRED = 0x911B
gl.CONDITION_SATISFIED = 0x911C
gl.WAIT_FAILED = 0x911D
gl.TIMEOUT_IGNORED = 0xFFFFFFFFFFFFFFFF
gl.SYNC_FLUSH_COMMANDS_BIT = 0x00000001
gl.SAMPLE_POSITION = 0x8E50
gl.SAMPLE_MASK = 0x8E51
gl.SAMPLE_MASK_VALUE = 0x8E52
gl.MAX_SAMPLE_MASK_WORDS = 0x8E59
gl.TEXTURE_2D_MULTISAMPLE = 0x9100
gl.PROXY_TEXTURE_2D_MULTISAMPLE = 0x9101
gl.TEXTURE_2D_MULTISAMPLE_ARRAY = 0x9102
gl.PROXY_TEXTURE_2D_MULTISAMPLE_ARRAY = 0x9103
gl.TEXTURE_BINDING_2D_MULTISAMPLE = 0x9104
gl.TEXTURE_BINDING_2D_MULTISAMPLE_ARRAY = 0x9105
gl.TEXTURE_SAMPLES = 0x9106
gl.TEXTURE_FIXED_SAMPLE_LOCATIONS = 0x9107
gl.SAMPLER_2D_MULTISAMPLE = 0x9108
gl.INT_SAMPLER_2D_MULTISAMPLE = 0x9109
gl.UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE = 0x910A
gl.SAMPLER_2D_MULTISAMPLE_ARRAY = 0x910B
gl.INT_SAMPLER_2D_MULTISAMPLE_ARRAY = 0x910C
gl.UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE_ARRAY = 0x910D
gl.MAX_COLOR_TEXTURE_SAMPLES = 0x910E
gl.MAX_DEPTH_TEXTURE_SAMPLES = 0x910F
gl.MAX_INTEGER_SAMPLES = 0x9110
gl.VERTEX_ATTRIB_ARRAY_DIVISOR = 0x88FE
gl.SRC1_COLOR = 0x88F9
gl.ONE_MINUS_SRC1_COLOR = 0x88FA
gl.ONE_MINUS_SRC1_ALPHA = 0x88FB
gl.MAX_DUAL_SOURCE_DRAW_BUFFERS = 0x88FC
gl.ANY_SAMPLES_PASSED = 0x8C2F
gl.SAMPLER_BINDING = 0x8919
gl.RGB10_A2UI = 0x906F
gl.TEXTURE_SWIZZLE_R = 0x8E42
gl.TEXTURE_SWIZZLE_G = 0x8E43
gl.TEXTURE_SWIZZLE_B = 0x8E44
gl.TEXTURE_SWIZZLE_A = 0x8E45
gl.TEXTURE_SWIZZLE_RGBA = 0x8E46
gl.TIME_ELAPSED = 0x88BF
gl.TIMESTAMP = 0x8E28
gl.INT_2_10_10_10_REV = 0x8D9F
gl.SAMPLE_SHADING = 0x8C36
gl.MIN_SAMPLE_SHADING_VALUE = 0x8C37
gl.MIN_PROGRAM_TEXTURE_GATHER_OFFSET = 0x8E5E
gl.MAX_PROGRAM_TEXTURE_GATHER_OFFSET = 0x8E5F
gl.TEXTURE_CUBE_MAP_ARRAY = 0x9009
gl.TEXTURE_BINDING_CUBE_MAP_ARRAY = 0x900A
gl.PROXY_TEXTURE_CUBE_MAP_ARRAY = 0x900B
gl.SAMPLER_CUBE_MAP_ARRAY = 0x900C
gl.SAMPLER_CUBE_MAP_ARRAY_SHADOW = 0x900D
gl.INT_SAMPLER_CUBE_MAP_ARRAY = 0x900E
gl.UNSIGNED_INT_SAMPLER_CUBE_MAP_ARRAY = 0x900F
gl.DRAW_INDIRECT_BUFFER = 0x8F3F
gl.DRAW_INDIRECT_BUFFER_BINDING = 0x8F43
gl.GEOMETRY_SHADER_INVOCATIONS = 0x887F
gl.MAX_GEOMETRY_SHADER_INVOCATIONS = 0x8E5A
gl.MIN_FRAGMENT_INTERPOLATION_OFFSET = 0x8E5B
gl.MAX_FRAGMENT_INTERPOLATION_OFFSET = 0x8E5C
gl.FRAGMENT_INTERPOLATION_OFFSET_BITS = 0x8E5D
gl.MAX_VERTEX_STREAMS = 0x8E71
gl.DOUBLE_VEC2 = 0x8FFC
gl.DOUBLE_VEC3 = 0x8FFD
gl.DOUBLE_VEC4 = 0x8FFE
gl.DOUBLE_MAT2 = 0x8F46
gl.DOUBLE_MAT3 = 0x8F47
gl.DOUBLE_MAT4 = 0x8F48
gl.DOUBLE_MAT2x3 = 0x8F49
gl.DOUBLE_MAT2x4 = 0x8F4A
gl.DOUBLE_MAT3x2 = 0x8F4B
gl.DOUBLE_MAT3x4 = 0x8F4C
gl.DOUBLE_MAT4x2 = 0x8F4D
gl.DOUBLE_MAT4x3 = 0x8F4E
gl.ACTIVE_SUBROUTINES = 0x8DE5
gl.ACTIVE_SUBROUTINE_UNIFORMS = 0x8DE6
gl.ACTIVE_SUBROUTINE_UNIFORM_LOCATIONS = 0x8E47
gl.ACTIVE_SUBROUTINE_MAX_LENGTH = 0x8E48
gl.ACTIVE_SUBROUTINE_UNIFORM_MAX_LENGTH = 0x8E49
gl.MAX_SUBROUTINES = 0x8DE7
gl.MAX_SUBROUTINE_UNIFORM_LOCATIONS = 0x8DE8
gl.NUM_COMPATIBLE_SUBROUTINES = 0x8E4A
gl.COMPATIBLE_SUBROUTINES = 0x8E4B
gl.PATCHES = 0x000E
gl.PATCH_VERTICES = 0x8E72
gl.PATCH_DEFAULT_INNER_LEVEL = 0x8E73
gl.PATCH_DEFAULT_OUTER_LEVEL = 0x8E74
gl.TESS_CONTROL_OUTPUT_VERTICES = 0x8E75
gl.TESS_GEN_MODE = 0x8E76
gl.TESS_GEN_SPACING = 0x8E77
gl.TESS_GEN_VERTEX_ORDER = 0x8E78
gl.TESS_GEN_POINT_MODE = 0x8E79
gl.ISOLINES = 0x8E7A
gl.FRACTIONAL_ODD = 0x8E7B
gl.FRACTIONAL_EVEN = 0x8E7C
gl.MAX_PATCH_VERTICES = 0x8E7D
gl.MAX_TESS_GEN_LEVEL = 0x8E7E
gl.MAX_TESS_CONTROL_UNIFORM_COMPONENTS = 0x8E7F
gl.MAX_TESS_EVALUATION_UNIFORM_COMPONENTS = 0x8E80
gl.MAX_TESS_CONTROL_TEXTURE_IMAGE_UNITS = 0x8E81
gl.MAX_TESS_EVALUATION_TEXTURE_IMAGE_UNITS = 0x8E82
gl.MAX_TESS_CONTROL_OUTPUT_COMPONENTS = 0x8E83
gl.MAX_TESS_PATCH_COMPONENTS = 0x8E84
gl.MAX_TESS_CONTROL_TOTAL_OUTPUT_COMPONENTS = 0x8E85
gl.MAX_TESS_EVALUATION_OUTPUT_COMPONENTS = 0x8E86
gl.MAX_TESS_CONTROL_UNIFORM_BLOCKS = 0x8E89
gl.MAX_TESS_EVALUATION_UNIFORM_BLOCKS = 0x8E8A
gl.MAX_TESS_CONTROL_INPUT_COMPONENTS = 0x886C
gl.MAX_TESS_EVALUATION_INPUT_COMPONENTS = 0x886D
gl.MAX_COMBINED_TESS_CONTROL_UNIFORM_COMPONENTS = 0x8E1E
gl.MAX_COMBINED_TESS_EVALUATION_UNIFORM_COMPONENTS = 0x8E1F
gl.UNIFORM_BLOCK_REFERENCED_BY_TESS_CONTROL_SHADER = 0x84F0
gl.UNIFORM_BLOCK_REFERENCED_BY_TESS_EVALUATION_SHADER = 0x84F1
gl.TESS_EVALUATION_SHADER = 0x8E87
gl.TESS_CONTROL_SHADER = 0x8E88
gl.TRANSFORM_FEEDBACK = 0x8E22
gl.TRANSFORM_FEEDBACK_BUFFER_PAUSED = 0x8E23
gl.TRANSFORM_FEEDBACK_BUFFER_ACTIVE = 0x8E24
gl.TRANSFORM_FEEDBACK_BINDING = 0x8E25
gl.MAX_TRANSFORM_FEEDBACK_BUFFERS = 0x8E70

module.exports = gl