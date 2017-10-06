declare module "gameplay/openal" {
  function bufferData(
    buffer: number, format: number, data: ArrayBufferView, rate: number): void
  function closeDevice(device: number): void
  function createBuffer(): number
  function createContext(device: number): number
  function createSource(): number
  function destroyContext(context: number): void
  function getError(): number
  function getSourcef(source: number, param: number): number
  function getSourcei(source: number, param: number): number
  function makeContextCurrent(context: number): void
  function openDevice(): number
  function source3f(
    source: number, format: number, v0: number, v1: number, v2: number): void
  function sourcef(source: number, format: number, v0: number): void
  function sourcei(source: number, format: number, param: number): void
  function sourcePause(source: number): void
  function sourcePlay(source: number): void
  function sourceStop(source: number): void

  const NONE
  const FALSE
  const TRUE
  const SOURCE_RELATIVE
  const CONE_INNER_ANGLE
  const CONE_OUTER_ANGLE
  const PITCH
  const POSITION
  const DIRECTION
  const VELOCITY
  const LOOPING
  const BUFFER
  const GAIN
  const MIN_GAIN
  const MAX_GAIN
  const ORIENTATION
  const SOURCE_STATE
  const INITIAL
  const PLAYING
  const PAUSED
  const STOPPED
  const BUFFERS_QUEUED
  const BUFFERS_PROCESSED
  const REFERENCE_DISTANCE
  const ROLLOFF_FACTOR
  const CONE_OUTER_GAIN
  const MAX_DISTANCE
  const SEC_OFFSET
  const SAMPLE_OFFSET
  const BYTE_OFFSET
  const SOURCE_TYPE
  const STATIC
  const STREAMING
  const UNDETERMINED
  const FORMAT_MONO8
  const FORMAT_MONO16
  const FORMAT_STEREO8
  const FORMAT_STEREO16
  const FREQUENCY
  const BITS
  const CHANNELS
  const SIZE
  const UNUSED
  const PENDING
  const PROCESSED
  const NO_ERROR
  const INVALID_NAME
  const INVALID_ENUM
  const INVALID_VALUE
  const INVALID_OPERATION
  const OUT_OF_MEMORY
  const VENDOR
  const VERSION
  const RENDERER
  const EXTENSIONS
}