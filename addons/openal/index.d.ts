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

  const NONE: number
  const FALSE: number
  const TRUE: number
  const SOURCE_RELATIVE: number
  const CONE_INNER_ANGLE: number
  const CONE_OUTER_ANGLE: number
  const PITCH: number
  const POSITION: number
  const DIRECTION: number
  const VELOCITY: number
  const LOOPING: number
  const BUFFER: number
  const GAIN: number
  const MIN_GAIN: number
  const MAX_GAIN: number
  const ORIENTATION: number
  const SOURCE_STATE: number
  const INITIAL: number
  const PLAYING: number
  const PAUSED: number
  const STOPPED: number
  const BUFFERS_QUEUED: number
  const BUFFERS_PROCESSED: number
  const REFERENCE_DISTANCE: number
  const ROLLOFF_FACTOR: number
  const CONE_OUTER_GAIN: number
  const MAX_DISTANCE: number
  const SEC_OFFSET: number
  const SAMPLE_OFFSET: number
  const BYTE_OFFSET: number
  const SOURCE_TYPE: number
  const STATIC: number
  const STREAMING: number
  const UNDETERMINED: number
  const FORMAT_MONO8: number
  const FORMAT_MONO16: number
  const FORMAT_STEREO8: number
  const FORMAT_STEREO16: number
  const FREQUENCY: number
  const BITS: number
  const CHANNELS: number
  const SIZE: number
  const UNUSED: number
  const PENDING: number
  const PROCESSED: number
  const NO_ERROR: number
  const INVALID_NAME: number
  const INVALID_ENUM: number
  const INVALID_VALUE: number
  const INVALID_OPERATION: number
  const OUT_OF_MEMORY: number
  const VENDOR: number
  const VERSION: number
  const RENDERER: number
  const EXTENSIONS: number
}